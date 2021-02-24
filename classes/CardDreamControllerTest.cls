@isTest
public  class CardDreamControllerTest {

    @testSetup 
    static void setup(){

        Product2 prod = new Product2();
        prod.Family = 'auto';
        prod.Name = 'car-Bmw';
        prod.Model__c = 'Bmw';
        prod.Price__c = 10000;
        prod.Year__c = Date.today();
        prod.Description__c = 'New car';

        insert prod;
    }

    static testMethod void  getCarsTest(){

        List<Product2> prod = CardDreamController.getCars();

        System.assert(!prod.isEmpty());
        
        System.assertEquals('New car',prod[0].Description__c);
    }
    
}