
import testing_automation
from apscheduler.schedulers.blocking import BlockingScheduler

cycle1 = [0,10,1]
cycle2 = [10,21,1]
cycle3 = [21,32,1]

First_run = testing_automation.KeywordMatching(cycle1)
Second_run = testing_automation.KeywordMatching(cycle2)
Third_run = testing_automation.KeywordMatching(cycle3)

schedule = BlockingScheduler()

#schedule.add_job(KeywordMatching(), 'cron', day_of_week='mon', hour=12)

schedule.add_job(First_run, 'cron', day_of_week='sun', hour='9', minute='33')
schedule.add_job(Second_run, 'cron', day_of_week='sun', hour='9', minute='53')
schedule.add_job(Third_run, 'cron', day_of_week='sun', hour='10', minute='13')

schedule.start
