public  class ProductManager {

    public static List<Product2> getByFamily(String category) {
        List<Product2> prod = new List<Product2>();
        if(String.isNotBlank(category)){
            prod = [SELECT Id,
                    Model__c,
                    Price__c,Year__c,
                    Description__c,
                    urlAttach__c,
                    (SELECT ContentDocument.LatestPublishedVersionID,
                    SystemModstamp
                    FROM ContentDocumentLinks
                    ORDER BY SystemModstamp
                    DESC LIMIT 1)
                    FROM Product2
                    WHERE Family=:category];
        }
        return prod;
    }
}
