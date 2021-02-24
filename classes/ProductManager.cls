public  class ProductManager {

    static final String CATEGORY_AUTO = System.Label.categoryAuto;

    public static List<Product2> getByFamily() {
        return [SELECT Id,Model__c,
                Price__c,Year__c,
                Description__c FROM
                Product2 WHERE
                Family=:CATEGORY_AUTO];
    }

}
