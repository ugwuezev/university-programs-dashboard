# Data Module

import db_connection

client = db_connection.DatabaseConnection()
db = client.ibmDB
university_collection = db.universities
keyword_collection = db.keywords

def UniversityFullNames():
    universityFullNames = []
    for document in university_collection.find({}):
        for key, value in document.items():
            if key == "full_name":
                full_name = document[key]
                universityFullNames.append(full_name)
                
    return universityFullNames


def UniversityTwitterNames():
    universityTwitterNames = []
    for document in university_collection.find({}):
        for key, value in document.items():
            if key == "twitter_name":
                twitter_name = document[key]
                universityTwitterNames.append(twitter_name)
                
    return universityTwitterNames


def UniversityTwitterHandles():
    universityTwitterHandles = []
    for document in university_collection.find({}):
        for key, value in document.items():
            if key == "twitter_handle":
                twitter_handle = document[key]
                universityTwitterHandles.append(twitter_handle)
                
    return universityTwitterHandles


def KeywordList():
    keywordList = []
    for document in keyword_collection.find({}):
        for key, value in document.items():
            if key == "name":
                name = document[key]
                keywordList.append(name)

    return keywordList
    
