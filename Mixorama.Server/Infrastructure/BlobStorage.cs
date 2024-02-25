using Azure.Identity;
using Azure.Storage.Blobs;

namespace Mixorama.Server.Infrastructure;

internal sealed class BlobStorage
{
    private  readonly BlobServiceClient _blobServiceClient;

    public BlobStorage()
    {
        _blobServiceClient = new BlobServiceClient(
            new Uri("https://stmixoramapreview.blob.core.windows.net"),
            new DefaultAzureCredential());    
    }

    public async Task UploadFile(Stream fileStream, string fileName)
    {
        string containerName = "cocktail-images";
        BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

        BlobClient blobClient = containerClient.GetBlobClient(fileName);
        await blobClient.UploadAsync(fileStream);
    }
}