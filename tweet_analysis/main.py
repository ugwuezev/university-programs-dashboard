
import db_connection
import auth
import data

def KeywordMatching(iteration):

    client = db_connection.DatabaseConnection()
    db = client.ibmDB
    university_collection = db.universities
    tweet_collection = db.tweets

    api = auth.TwitterAuthentication()

    # data from DB
    universityFullNames = data.UniversityFullNames()
    universityTwitterNames = data.UniversityTwitterNames()
    universityTwitterHandles = data.UniversityTwitterHandles()
    keywordList = data.KeywordList()

    #iteration = len(universityTwitterHandles)
    #string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(iteration)}
    # first run: 10 & second: 10, 21, 1 & Third: 21, 32, 1
    
    string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(iteration[0], iteration[1], iteration[2])}

    # keyword matching algorithm
    for keyword in keywordList:

        for university_twitter_handle, university_twitter_name in string_dict.items():

            # gets the particular twitter avi for the corresponding school
            for document in university_collection.find({}):
                #print(document)
                for key, value in document.items():
                    if value == university_twitter_handle:
                        twitter_avi_link = "twitter_avi_link"
                        university_avi_link = document[twitter_avi_link]

            # string combination used for the search api
            string = "(IBM " + keyword + " " + university_twitter_handle + " lang:en -is:retweet )" + " OR "  + "(IBM " + keyword + " " + university_twitter_name + " lang:en -is:retweet)"

            # the twitter search tweet function
            tweets = api.search_tweets(string, tweet_mode="extended")

            # stores result in the database if there is a match
            for tweet in tweets:
                
                date = tweet.created_at.split("T")
                url = "https://www.twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str
                
                document = {
                    "university_avi_link": university_avi_link,
                    "university_name": university_twitter_name,
                    "tweeter_handle": tweet.user.screen_name,
                    "time_posted": date[0],
                    "tweet_content": tweet.full_text,
                    "retweet_count": tweet.retweet_count,
                    "likes_count": tweet.favorite_count,
                    "tweet_url": url
                    }
                   
                tweet_collection.insert_one(document)

# Tests
cycle1 = [0,10,1]
cycle2 = [10,21,1]
cycle3 = [21,32,1]

KeywordMatching(cycle1)
print("Done")
