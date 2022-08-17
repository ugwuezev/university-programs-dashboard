
import testing_automation
from apscheduler.schedulers.blocking import BlockingScheduler

cycle1 = 10
cycle2 = 10,21,1
cycle3 = 21,32,1

First_run = testing_automation.KeywordMatching(cycle1)
Second_run = testing_automation.KeywordMatching(cycle2)
Third_run = testing_automation.KeywordMatching(cycle3)

schedule = BlockingScheduler()

#schedule.add_job(KeywordMatching(), 'cron', day_of_week='mon', hour=12)

schedule.add_job(First_run, 'cron', day_of_week='wed', hour='10', minute='5')
schedule.add_job(Second_run, 'cron', day_of_week='wed', hour='10', minute='30')
schedule.add_job(Third_run, 'cron', day_of_week='wed', hour='10', minute='55')

schedule.start
