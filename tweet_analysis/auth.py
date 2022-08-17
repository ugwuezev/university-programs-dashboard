# Twitter authentication module

import tweepy
import configparser

def TwitterAuthentication():
    
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

    return api
