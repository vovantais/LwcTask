@isTest
public  class CardDreamControllerTest {

    @testSetup
    static void setup(){

        Product2 prod = new Product2();
        prod.Family = 'auto';
        prod.Name = 'car-Bmw';
        prod.Model__c = 'Bmw';
        prod.urlAttach__c = '';
        prod.Price__c = 10000;
        prod.Year__c = Date.today();
        prod.Description__c = 'New car';

        insert prod;

        ContentVersion cv = new ContentVersion();
        cv.Title = 'Test Document';
        cv.PathOnClient = 'TestDocument.pdf';
        cv.VersionData = Blob.valueOf('Test Content');
        cv.IsMajorVersion = true;

        insert cv;

        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cv.Id].ContentDocumentId;

        ContentDocumentLink link = new ContentDocumentLink();
        link.ContentDocumentId = conDoc;
        link.LinkedEntityId = prod.Id;

        insert link;
    }

    static testMethod void  getCarsTest(){

        List<Product2> prod = CardDreamController.getCars();

        System.assert(!prod.isEmpty());

        System.assertEquals('New car', prod[0].Description__c);

        System.assertEquals(URL.getSalesforceBaseUrl().toExternalForm()+'/sfc/servlet.shepherd/version/download/'+prod[0].ContentDocumentLinks[0].ContentDocument.LatestPublishedVersionId, prod[0].urlAttach__c);
    }

}