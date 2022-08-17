
import db_connection
import auth
import data
#from apscheduler.schedulers.blocking import BlockingScheduler

def KeywordMatching(iteration):

    print("starting cron job")

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
    
    string_dict = {universityTwitterHandles[i]: universityTwitterNames[i] for i in range(iteration)}

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
                document = {
                    "university_avi_link": university_avi_link,
                    "university_name": university_twitter_name,
                    "tweeter_handle":tweet.user.screen_name,
                    "time_posted":tweet.created_at,
                    "tweet_content":tweet.full_text
                    }
                tweet_collection.insert_one(document)
                
    print("Done")

##schedule = BlockingScheduler()
###schedule.add_job(KeywordMatching(), 'cron', day_of_week='mon', hour=12)
##schedule.add_job(KeywordMatching(), 'cron', day_of_week='wed', hour=9, minute=39)
##schedule.start
