public  class CardDreamController {

    static final String IMAGE_STORE ='/sfc/servlet.shepherd/version/download/';
    static final String CATEGORY = 'auto';

    @AuraEnabled(cacheable = true)
    public static List<Product2> getCars(){
        List <Product2> productManager = ProductManager.getByFamily(CATEGORY);
        for (Product2 prod : productManager){
            prod.urlAttach__c =  URL.getSalesforceBaseUrl().toExternalForm() + IMAGE_STORE + prod.ContentDocumentLinks[0].ContentDocument.LatestPublishedVersionId;
        }
        return productManager;
    }
}