import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { v4 as uuid } from 'uuid'

export class BlobService {
    CONTAINER_NAME = "userprofilepictures"
    AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    blobServiceClient : BlobServiceClient | undefined = undefined
    containerClient: ContainerClient | undefined = undefined

    constructor(){

        if(!this.AZURE_STORAGE_CONNECTION_STRING) throw new Error("String de conexão não encontrada")

        this.blobServiceClient = BlobServiceClient.fromConnectionString(
            this.AZURE_STORAGE_CONNECTION_STRING
          );

        this.containerClient = this.blobServiceClient?.getContainerClient(this.CONTAINER_NAME);



    }
    async generateContainer(){

        console.log({name: this.CONTAINER_NAME})
        const containerClient = this.blobServiceClient?.getContainerClient(this.CONTAINER_NAME);

        const createContainerResponse = await containerClient?.create();
 
        return createContainerResponse;
        
    }
    
    async getContainer(){

        const containerClient = this.blobServiceClient?.getContainerClient(this.CONTAINER_NAME);

        console.log({containerClient})

        return containerClient;
        
    }

    async generateBlob({userId, image}){

        const blobClient = await this.getContainer()

        const blobName = `blob${userId}image${uuid()}.jpg`

        const blockBlobClient = blobClient?.getBlockBlobClient(blobName)

        await blockBlobClient?.upload(image, image.length)

        const url = blockBlobClient?.url
        
        return url;
    }
}