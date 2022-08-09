
from pymongo import MongoClient

# connect to database

MONGO_URI = "mongodb+srv://mongo:genius@cluster0.4poj9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client.ibmDB

keyword_collection = db.keywords
university_collection = db.universities

universityTwitterHandles = []
for document in university_collection.find({}):
    for key, value in document.items():
        if key == "twitter_handle":
            twitter_handle = document[key]
            universityTwitterHandles.append(twitter_handle)
#print(universityTwitterHandles)

universityNames = []
for document in university_collection.find({}):
    for key, value in document.items():
        if key == "full_name":
            full_name = document[key]
            universityNames.append(full_name)
#print(universityNames)

universityTwitterNames = []
for document in university_collection.find({}):
    for key, value in document.items():
        if key == "twitter_name":
            twitter_name = document[key]
            universityTwitterNames.append(twitter_name)
#print(universityTwitterNames)

keywordList = []
for document in keyword_collection.find({}):
    for key, value in document.items():
        if key == "name":
            name = document[key]
            keywordList.append(name)
#print(keywordList)


string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(len(universityTwitterHandles))}
#print(string_dict)

string_array = []
count = 0

for keyword in keywordList:
    for university_twitter_handle, university_twitter_name in string_dict.items():
        
        for document in university_collection.find({}):
            #print(document)
            for key, value in document.items():
                if value == university_twitter_handle:
                    twitter_avi_link = "twitter_avi_link"
                    university_avi_link = document[twitter_avi_link]
        
                    
        #string = "IBM " + keyword + " " + key + " OR " + "IBM " + keyword + " " + value + " lang:en -is:retweet"
        #string = "IBM " + keyword + " (" + key + " OR ("  + value + ")) lang:en -is:retweet"
        string = "(IBM " + keyword + " " + university_twitter_handle + " lang:en -is:retweet )" + " OR "  + "(IBM " + keyword + " " + university_twitter_name + " lang:en -is:retweet)"
        string_array.append(string)
        count = count + 1
        

#print(string_array)
#print(count)

print(university_avi_link)





