import type { ExecuteMsg, InsertData } from "@okp4/cognitarium-schema";
import { Execute } from "./Execute";
import { encodeForMsgTx } from "../utils";

export function ExecuteCognitarium({
    contractAddress,
}: {
    contractAddress: string;
}) {
    const serviceDataTurtle = `@prefix category: <https://ontology.okp4.space/thesaurus/service-category/> .
@prefix core: <https://ontology.okp4.space/core/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix service: <https://ontology.okp4.space/dataverse/service/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://ontology.okp4.space/dataverse/service/metadata/be67f7df-ff02-47c8-b55f-865b387c68ca> a owl:NamedIndividual,
        <https://ontology.okp4.space/metadata/service/GeneralMetadata> ;
    core:describes service:03230ce7-d8cb-410e-919e-19c480c1dd75 ;
    core:hasCategory category:Storage ;
    core:hasDescription "Service de stockage de données"@fr ;
    core:hasDescription "Data storage service"@en ;
    core:hasDescription "Datenspeicherungsdienst"@de ;
    core:hasPublisher "OKP4" ;
    core:hasTag "stockage" ;
    core:hasTitle "Clever Cloud Data Storage"@en .

<https://ontology.okp4.space/dataverse/service/metadata/ae18aa63-bbfc-44e4-bc4a-29f3fab3bec0> a owl:NamedIndividual,
        <https://ontology.okp4.space/metadata/AuditMetadata> ;
    core:createdBy <did:key:z6Mkg6zUc9QFnHtfSnawoXVB269ko7wgmZXLHVJDwweDqL3y> ;
    core:createdOn "2023-07-04T10:00:00Z"^^xsd:dateTimeStamp ;
    core:describes service:03230ce7-d8cb-410e-919e-19c480c1dd75 ;
    core:lastModifiedBy <did:key:z6Mkg6zUc9QFnHtfSnawoXVB269ko7wgmZXLHVJDwweDqL3y> ;
    core:updatedOn "2023-07-04T10:00:00Z"^^xsd:dateTimeStamp .

service:03230ce7-d8cb-410e-919e-19c480c1dd75 a owl:NamedIndividual,
        core:Service ;
    core:hasIdentifier <urn:uuid:03230ce7-d8cb-410e-919e-19c480c1dd75> ;
    core:hasIdentity <did:key:z6Mkg6zUc9QFnHtfSnawoXVB269ko7wgmZXLHVJDwweDqL3y> ;
    core:hasRegistrar <did:key:z6Mkg6zUc9QFnHtfSnawoXVB269ko7wgmZXLHVJDwweDqL3y> .`;

    const insert_data: InsertData = {
        data: encodeForMsgTx(serviceDataTurtle),
    };
    const msg: ExecuteMsg = {
        insert_data,
    };

    const memo = "cognitarium insertion from the frontdemo";

    return (
        <Execute
            contractAddress={contractAddress}
            executeArgs={{
                msg,
                memo,
            }}
            textButton="Execute a message (insert data)"
        />
    );
}
