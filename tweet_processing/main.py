
import tweepy
import configparser
import pandas as pd
from pymongo import MongoClient

# Read config and connect to twitter search api

config = configparser.ConfigParser()
config.read('config.ini')

api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

access_token = config['twitter']['access_token']
access_token_secret= config['twitter']['access_token_secret']

auth = tweepy.OAuth1UserHandler(
  api_key,
  api_key_secret,
  access_token,
  access_token_secret
)

api = tweepy.API(auth)

# connect to database

MONGO_URI = "mongodb+srv://mongo:genius@cluster0.4poj9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client.ibmDB

# getting collections from the database

tweet_collection = db.tweets
keyword_collection = db.keywords
university_collection = db.universities

# pulling search items from db and saving as a list

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

## for the main code - to be reduce for every 15 minutes interval            
#string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(len(universityTwitterHandles))}
#print(string_dict)

#for testing
#first run: 10 & second: 11, 21, 1 & Third: 22, 33, 1
string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(11,21,1)}

for keyword in keywordList:
    for university_twitter_handle, university_twitter_name in string_dict.items():
        
        for document in university_collection.find({}):
            #print(document)
            for key, value in document.items():
                if value == university_twitter_handle:
                    twitter_avi_link = "twitter_avi_link"
                    university_avi_link = document[twitter_avi_link]


        string = "(IBM " + keyword + " " + university_twitter_handle + " lang:en -is:retweet )" + " OR "  + "(IBM " + keyword + " " + university_twitter_name + " lang:en -is:retweet)"
        
        tweets = api.search_tweets(string, tweet_mode="extended")

        for tweet in tweets:
            document = {
                "university_avi_link": university_avi_link,
                "university_name": university_twitter_name,
                "tweeter_handle":tweet.user.screen_name,
                "time_posted":tweet.created_at,
                "tweet_content":tweet.full_text
                }
            tweet_collection.insert_one(document)
     
print("Done")
