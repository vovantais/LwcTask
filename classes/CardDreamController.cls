public  class CardDreamController {

    static final String IMAGE_STORE ='/sfc/servlet.shepherd/version/download/';

    @AuraEnabled(cacheable=true)
    public static List<Product2> getCars(){
        return ProductManager.getByFamily();
    }

    @AuraEnabled
    public static void getDataImg(String recordId){
//        String url='';
//      if(recordId != null){
//            Product2 prod = ProductManager.getById(recordId);

//            String documentName = 'carImg' + System.now().format('yyyy_MM_dd_hh_mm_ss') + '.txt';
//            Attachment att=new Attachment();
//            att.ParentId = prod.Id;
//            att.Name= documentName;
//            att.Body=Blob.valueOf(img);
//            //att.ContentType = 'image/png';
//            insert att;


//            String url = URL.getSalesforceBaseUrl().toExternalForm() + IMAGE_STORE + ProductManager.getAttachmentUrl(recordId);
//            System.debug('====== filesUrl ======== '+ url);

       ContentDocumentLink cdLinks = ProductManager.getAttachmentUrl(recordId);
        System.debug('====== filesUrl ======== '+ cdLinks);
        String imgUrl = URL.getSalesforceBaseUrl().toExternalForm() + IMAGE_STORE + cdLinks.ContentDocument.LatestPublishedVersionID;
        System.debug('====== filesUrl ======== '+ imgUrl);





//        String url = URL.getSalesforceBaseUrl().toExternalForm() + IMAGE_STORE;
//        return url;
//        String base64Content = ( String )JSON.deserialize( img, String.class );
//            System.debug(' ======== base64Content ===' + base64Content);
//            System.debug('======= img ======= ' + img);
//        ContentVersion conVer = new ContentVersion();
//        conVer.ContentLocation = 'S'; // S specify this document is in SF, use E for external files
//        conVer.PathOnClient = 'car.png'; // The files name, extension is very important here which will help the file in preview.
//        conVer.Title = 'car.png'; // Display name of the files
//        conVer.VersionData = Blob.valueOf(img); // converting your binary string to Blog
//        insert conVer;
//
//            System.debug('conVer.VersionData ' + conVer.VersionData);
//
//        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
//
//        ContentDocumentLink cDe = new ContentDocumentLink();
//        cDe.ContentDocumentId = conDoc;
//        cDe.LinkedEntityId = prod.Id; // you can use objectId,GroupId etc
//        cDe.ShareType = 'I'; // Inferred permission, checkout description of ContentDocumentLink object for more details
//        cDe.Visibility = 'InternalUsers';
//        insert cDe;

//       }
//        return url;

    }



}