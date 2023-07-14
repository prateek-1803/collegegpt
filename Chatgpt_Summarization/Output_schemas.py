from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser

def get_output_parser():
    Summary_schema = ResponseSchema(
        name="Summary",
        description="Summary about the College"
    )

    Placement = ResponseSchema(
        name="Placement and Internship",
        description="The rating of Placement and Internship of the college on a scale of 1 to 5"
    )

    Faculty = ResponseSchema(
        name="Faculty",
        description="The rating of Faculty of the college on a scale of 1 to 5"
    )
    Infrastructure = ResponseSchema(
        name="Infrastructure & facilities",
        description="The rating of Infrastructure & facilitiesof the college on a scale of 1 to 5"
    )
    Events = ResponseSchema(
        name="Events and extracurricular activities",
        description="The rating of Events and extracurricular activities of the college on a scale of 1 to 5"
    )
    Fees = ResponseSchema(
        name="Fee structure and scholarships",
        description="The rating of Fee structure and scholarships of the college on a scale of 1 to 5"
    )
    Campus = ResponseSchema(
        name="Campus life",
        description="The rating of Campus life of the college on a scale of 1 to 5"
    )

    response_schemas = [
        Summary_schema,
        Placement,
        Faculty,
        Infrastructure,
        Events,
        Fees,
        Campus
    ]
    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

    return output_parser

def get_format_instructions():
    output_parser = get_output_parser()
    format_instructions = output_parser.get_format_instructions()
    return format_instructions