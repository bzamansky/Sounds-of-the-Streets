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
  channels = []
  playlists = []

#[u'thumbnails', u'channelId', u'description', u'publishedAt', u'title']


  results = search_response.get("items",[])
  #print "####TITLE THEN VIDEOID####"
  #print results[0]['snippet']['title']
  #print results[0]['id']['videoId']
  try:
    vidID = results[0]['id']['videoId']
  except:
    print "ERROR, VIDEO ID HAD AN ERROR SO WE'RE GIVING YOU THE LLAMA SONG"
    vidID = "qybUFnY7Y8w"
  #print "####STUFF THAT GOES AFTER####"
  for search_result in search_response.get("items", []):
    #  print search_result['snippet']["title"]
    #  print search_result['snippet']['thumbnails']['default']['url']
      if search_result["id"]["kind"] == "youtube#video":
          videos.append("%s (%s)" % (search_result["snippet"]["title"],
                                     search_result["id"]["videoId"]))
      elif search_result["id"]["kind"] == "youtube#channel":
          channels.append("%s (%s)" % (search_result["snippet"]["title"],
                                       search_result["id"]["channelId"]))
      elif search_result["id"]["kind"] == "youtube#playlist":
          playlists.append("%s (%s)" % (search_result["snippet"]["title"],
                                        search_result["id"]["playlistId"]))

 # print "Videos:\n", "\n".join(videos), "\n"
 # print "Channels:\n", "\n".join(channels), "\n"
 # print "Playlists:\n", "\n".join(playlists), "\n"
  print vidID
  return vidID

def makeParse(name):
  parser = OptionParser()
  parser.add_option("--q", dest="q", help="Search term",
    default="Google")
  parser.add_option("--max-results", dest="maxResults",
    help="Max results", default=25)
  (options, args) = parser.parse_args()
  options.q = name
  #print options.q
  return youtube_search(options)


#print makeParse("tonight")
