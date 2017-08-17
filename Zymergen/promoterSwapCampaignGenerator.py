from zypy.campaigns.campaignGenerator import CampaignGenerator, ReplaceInputValues,\
    CampaignDesignException
from zypy.dnaInterpretation.annotationInterpreter import AnnotationInterpreter
from drawbridge.models.avro.dna_annotation import DnaAnnotation
from drawbridge.models.avro.dna_component import DnaComponent
from zypy.dnaComponents import drawbridgeDnaComponentUtils
from zypy.dnaSpecifications.dnaSpecificationFactory import LocationFields
from zypy.models.avro.dnaSpecification import DnaSpecification
from zypy.constants.sequenceFeatureTerms import GENE_ANNOTATION, CDS_ANNOTATION

from zypy.utils.utils import is_iterable


class PromoterSwapCampaignGenerator(CampaignGenerator):
    """
    This class is one in a set of tools that create DnaSpecifications to
    describe a set of designed strains (i.e. a campaign).
    A promoter swap campaign is defined by a host strain, a list of
    gene names, and a list of new promoters to insert.  The host strain must
    have a DnaComponent in ZRest.  The genes and associated promoters should
    be annotated in the host strain.
    TODO (frewen) support multiple host strains
    TODO (frewen) create a campaign entity at the same time
    """
    # TODO (frewen) have version number autmagically set wrt git
    TOOL_VERSION = "1.0"

    def __init__(self, genes=None, insert_promoters=None, default_to_insert=None,
                 annotations_to_duplicate_on_overlap=None, cds=None, **kwargs):
        super(PromoterSwapCampaignGenerator, self).__init__(**kwargs)
        self._gene_names = genes
        self._cds_names = cds
        self._promoter_specification_id = None
        self._new_promoters = self._format_promoter_list(insert_promoters)
        self._default_to_insert = default_to_insert
        self._annotations_to_duplicate_on_overlap = annotations_to_duplicate_on_overlap

    def _interpret_inputs(self):
        if not self._new_promoters:
            raise ValueError("PromoterSwapCampaignGenerator missing list of new promoters")

        # First find the locations of all promoters for all genes
        gene_warnings = []
        cds_warnings = []
        if self._gene_names:
            gene_locations, gene_warnings = AnnotationInterpreter().interpret_promoters(
                self.host_strain_component, self._gene_names,
                self._default_to_insert, self._annotations_to_duplicate_on_overlap, GENE_ANNOTATION)
            self._feature_locations_helper(gene_locations)

        # find the locations of all promoters for all cds
        if self._cds_names:
            cds_locations, cds_warnings = AnnotationInterpreter().interpret_promoters(
                self.host_strain_component, self._cds_names,
                self._default_to_insert, self._annotations_to_duplicate_on_overlap, CDS_ANNOTATION)
            self._feature_locations_helper(cds_locations)
        warnings = gene_warnings + cds_warnings

        # warnings are a list of lists. first element is gene name, remaining
        # are warnings messages. Join up the messages into one string
        for gene_list in warnings:
            self.warnings[gene_list[0]] = '. '.join([str(x) for x in gene_list[1:]])

    def _feature_locations_helper(self, locations):
        """
        Helper function to find out a list replacement location values for new strains
        @param locations [list<PromoterLocation>] list of existing promoter locations
        """
        # Split the locations into those that are a standard replacement of the
        # existing sequence and those that should duplicate the existing sequence
        standard_locations = [loc for loc in locations if not loc.do_duplicate]
        duplication_locations = [loc for loc in locations if loc.do_duplicate]

        # We need to create two inner specifications, one for each of the types of locations.
        # The standard replacements are location cross new sequences.
        # The duplication replacements are location dot new sequences with
        # duplicated region appended.

        # Create one set of replacement values for eacy type of location
        if standard_locations:
            # turn the promoter locations into LocationFields with strain names
            named_locations = [LocationFields(loc.promoter_name + "-$insert_name",
                                              loc.five_prime_pos, loc.existing_seq, loc.orientation, loc.feature_type)
                               for loc in standard_locations]

            self.replace_spec_inputs.append(ReplaceInputValues(named_locations, self._new_promoters,
                                                               "CROSS", {}))
        if duplication_locations:
            # turn the promoter locations into LocationFields with strain names
            # with some fancy logic for how to do the duplication
            named_locations, promoters_plus_native_seq = \
                self._convert_promoter_locations_for_duplication(duplication_locations,
                                                                 self._new_promoters)
            self.replace_spec_inputs.append(ReplaceInputValues(named_locations,
                                                               promoters_plus_native_seq,
                                                               "ZIP", {}))

    def _add_annotation_to_introduced_promoter(self, dna_comp):
        """
        Add annotation data to the promoters obtained from the csv or existing DnaSpecification
        This method is specific to the _format_promoter_list() and _fetch_dna() methods
        """
        annot = DnaAnnotation(
            annotationName="introduced promoter",
            description="introduced promoter",
            featureTerm="promoter",
            startPosition=0,
            endPosition=len(dna_comp))
        dna_comp.add_annotation(annot)
        return dna_comp

    def _fetch_dna(self):
        """
        overriding _fetch_dna()
        This method fetches objects from Zrest for the specified ZIds.
        Here it additionaly it finds and iterates through the given Zid to get its DnaComponents,
        then add annotations to each DnaComponents
        and return the obtained DnaComponents as the promoters for camapign design
        """
        super(PromoterSwapCampaignGenerator, self)._fetch_dna()
        if self._promoter_specification_id:
            results = []

            spec = DnaSpecification.find(self._promoter_specification_id)

            if spec is None:
                raise CampaignDesignException(
                    str(self._promoter_specification_id) + " is an invalid DnaSpecification Zid")

            for dna in spec.iter_output_components():
                results.append(self._add_annotation_to_introduced_promoter(dna))
            self._new_promoters = results

    def _format_promoter_list(self, promoters):
        """
        Determine the current form of the promoters to be inserted and turn them
        into a list of DnaComponents.
        Currently, the promoters are given by the user as a name/sequence pair
        or as an existing DnaSpecification Zid
        """

        # Check for empty promoter input
        if not promoters:
            return None

        # If input is a zid
        if not is_iterable(promoters):
            self._promoter_specification_id = promoters
            return

        # If input is a list of promoters
        results = []
        for element in promoters:
            dna_comp = None
            name = None
            if isinstance(element, (list, tuple)):
                name = element[0]
                seq = element[1]

                dna_comp = DnaComponent(
                    componentName=name,
                    sequence=seq,
                    description="promoter to be inserted for proswp")
            elif isinstance(element, DnaComponent):
                dna_comp = element
                name = element.name
            # TODO (frewen) handle promoters passed as zids
            else:
                raise Exception("Not sure how to turn this into a DnaComp: " + str(element))

            # give it one annotation for the entire sequence
            # these annotation properties will appear in all new strains
            # and add them to the list of new promoters for campaign design
            dna_comp = self._add_annotation_to_introduced_promoter(dna_comp)
            results.append(dna_comp)
        return results

    def _convert_promoter_locations_for_duplication(self, duplication_locations, new_promoters):
        """
        Convert the information about the promoter locations into
        insertion/deletion information. The existing sequence is not being
        replaced, it is being duplicated. It will need to be encoded on the tail
        of the primers that encode the mutation and be put upstream of the
        new promoter being inserted.
        @param duplication_locations [list<PromoterLocation>] existing seqs/locations to duplicate
        @param new_promoters [list<DnaComponent>] promoters to insert at locations
        @return the list of LocationFields where replacements should be made and
        a list of DnaComponents with the new sequences to insert.
        """
        indel_locations = []
        insertion_seqs = []
        for location in duplication_locations:
            # check that location.do_duplicate is true?
            insertion_position = location.five_prime_pos
            if "reverse" == location.orientation:
                insertion_position += len(location.existing_seq)

            # add an annotation to the existing seq (copy seq first?)
            annot = DnaAnnotation(
                annotationName="duplicated region of overlapping gene",
                startPosition=0,
                endPosition=len(location.existing_seq),
                featureTerm="duplication",
                description="")
            location.existing_seq.add_annotation(annot)
            existing_seq_rc = DnaComponent.reverse_complement(location.existing_seq)
            for promoter in new_promoters:
                # add an annotation to the new promoter
                # TODO(frewen): write a concat function that automatically annotates the two pieces
                # with the name of their original component. Requires feature type for each piece
                annot = DnaAnnotation(
                    annotationName=promoter.name,
                    startPosition=0,
                    endPosition=len(promoter),
                    featureTerm="promoter",
                    description="",
                    direction="FORWARD")
                promoter.add_annotation(annot)
                if "forward" == location.orientation:
                    new_seq = location.existing_seq + promoter
                else:  # reverse
                    new_seq = existing_seq_rc + promoter
                # create a new location for this gene-promoter pair
                # name the sequence for the new promoter so the strain name is correct
                new_seq = drawbridgeDnaComponentUtils.new_dna_component_from_old(
                    new_seq,
                    componentName=promoter.componentName)
                indel_locations.append(LocationFields(location.promoter_name + "-$insert_name",
                                                      insertion_position, "", location.orientation, location.feature_type))
                # create a new sequence for this duplicated region + promoter
                insertion_seqs.append(new_seq)

        return indel_locations, insertion_seqs