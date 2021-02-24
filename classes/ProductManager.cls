public  class ProductManager {

    public static List<Product2> getByFamily(String category) {

        List<Product2> prod = new List<Product2>();
        if(category != null){
            prod = [SELECT Id,Model__c,
                    Price__c,Year__c,
                    Description__c FROM
                    Product2 WHERE
                    Family=:category];
        }
        return prod;
    }

}