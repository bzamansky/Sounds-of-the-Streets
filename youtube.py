from apiclient.discovery import build
from optparse import OptionParser

key = "AIzaSyDm3LFbtgPrB8jtcruyGlf9ED-tidYvYrA"
other_key =  "AI39si5ftQAadvFWghwUFyQgZVRXIj_E-J8bmlv1PeQCZ5dQQneayRz1XV822s8phGDKpqknrl7n0HoiSLwaxfd5HlbU4s2iMg"

# Set DEVELOPER_KEY to the "API key" value from the "Access" tab of the
# Google APIs Console http://code.google.com/apis/console#access
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = key
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def youtube_search(options):
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)
  search_response = youtube.search().list(
    q=options.q,
    part="id,snippet",
    maxResults=options.maxResults
  ).execute()
  
  videos = []
  
  results = search_response.get("items",[])
  for item in results:
    try:
      print item
      vidID = item['id']['videoId']
      videos.append(vidID)
    except:
      vidID = "UJKythlXAIY"
  return videos

def makeParse(name):
  parser = OptionParser()
  parser.add_option("--q", dest="q", help="Search term",
    default="Google")
  parser.add_option("--max-results", dest="maxResults",
    help="Max results", default=25)
  (options, args) = parser.parse_args()
  options.q = name
  return youtube_search(options)

