@isTest
public  class ProductManagerTest {

    @testSetup static void setup(){

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

        String category = 'notAuto';
        
        List<Product2> prod = ProductManager.getByFamily(category);

        System.assertNotEquals(1,prod.size());
    }
}