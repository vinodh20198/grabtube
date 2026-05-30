import type { BlogSection } from "@/components/BlogPost";

interface Post {
  title: string;
  description: string;
  datePublished: string;
  readTime: string;
  intro: React.ReactNode;
  sections: BlogSection[];
  cta?: { to: string; label: string };
}

export const POST_CONTENT: Record<string, Post> = {
  "youtube-to-mp4": {
    title: "How to Convert YouTube to MP4 (2026 Guide)",
    description: "Free step-by-step guide to converting any YouTube video to MP4 — on phone, laptop, or tablet, with no software install.",
    datePublished: "2026-05-30",
    readTime: "5 min read",
    intro: "MP4 is the universal video format — it plays on every phone, every laptop, every smart TV, and every editing app. If you want to keep a YouTube video for offline viewing, MP4 is almost always the right choice. Here's the cleanest way to do it in 2026.",
    sections: [
      { h: "Why MP4 and not WebM or MKV?", p: "YouTube actually serves videos in multiple containers (MP4, WebM, sometimes MKV). MP4 wins because it's H.264/H.265 inside an MP4 wrapper — supported natively by iPhones, Androids, Macs, Windows, and every browser since 2012. WebM is smaller but doesn't play in iMovie or Apple Photos. MKV is great for archives but won't open on most phones. For 95% of people, MP4 is the right answer." },
      { h: "Step-by-step on desktop", p: "Copy the YouTube URL from your browser's address bar. Open the GrabTube YouTube to MP4 tool. Paste the link, pick your resolution (1080p is the sweet spot — 720p for old laptops, 4K only if the source supports it), and click Download. The file lands in your Downloads folder in seconds." },
      { h: "Step-by-step on mobile", p: "On iPhone, open Safari (not Chrome — Safari has better download integration). Paste the link, tap Download, then choose Save to Files or Save to Photos. On Android, downloads go straight to your Downloads folder or gallery depending on your browser." },
      { h: "Picking the right resolution", p: "1080p is the sweet spot in 2026 — high enough for laptop and TV viewing, small enough that a 10-minute video is around 100MB. Drop to 720p if you're saving to a phone with limited storage. Only go 4K when the original was filmed in 4K and you have an HDR display — otherwise you're just wasting disk space." },
      { h: "Common problems", p: "If the download fails, the most common cause is the video being age-restricted, private, or region-blocked. Try a different video to confirm the tool is working. If you get an MP4 with no audio, that means YouTube served a video-only stream — switch to a lower resolution; those are usually muxed (video + audio combined)." },
    ],
    cta: { to: "/youtube-to-mp4", label: "Open YouTube to MP4 tool" },
  },
  "youtube-to-mp3": {
    title: "YouTube to MP3: The Complete 320kbps Conversion Guide",
    description: "Everything you need to know about converting YouTube videos to MP3 audio at 320kbps — quality, file size, and how to do it free.",
    datePublished: "2026-05-30",
    readTime: "6 min read",
    intro: "Sometimes you just want the audio. A song, a lecture, a podcast clip, a guided meditation — none of that needs the video. Here's how YouTube to MP3 conversion works in 2026, what 320kbps actually means, and when to use lower bitrates.",
    sections: [
      { h: "What 320kbps really means", p: "Bitrate is the amount of audio data per second. 320kbps is the maximum MP3 supports — about 2.4MB per minute of audio. At this bitrate, MP3 is virtually indistinguishable from the original lossless source for most listeners. Below 192kbps you start to hear cymbals lose their shimmer; below 128kbps voices sound thin." },
      { h: "When to use lower bitrates", p: "For spoken-word podcasts, audiobooks, or lectures, 128kbps is perfectly fine and cuts file size by 60%. A 1-hour podcast at 320kbps is ~144MB; at 128kbps it's ~58MB. For music — especially classical, jazz, or anything with subtle dynamics — stick with 320kbps." },
      { h: "How the conversion works", p: "YouTube doesn't store audio separately from video for older uploads. The tool downloads the audio stream (usually AAC or Opus inside the video container), then re-encodes it as MP3. There's a small quality loss from the re-encode, but at 320kbps it's inaudible. Newer uploads have separate audio-only streams that can be pulled directly." },
      { h: "What about metadata?", p: "A good MP3 has ID3 tags: title, artist, album, year, even cover art. GrabTube auto-fills the title from the YouTube video. For full music library tagging, run the downloaded MP3 through MusicBrainz Picard — it'll match the song against a database and fill in everything correctly." },
      { h: "Is the audio quality the same as Spotify?", p: "Spotify Premium streams at 320kbps Ogg Vorbis — slightly better than 320kbps MP3 for the same bitrate. But if the YouTube source is the original studio master uploaded by the artist, the MP3 you get will sound essentially identical to streaming. For user-uploaded content (covers, live recordings), quality depends entirely on the original upload." },
    ],
    cta: { to: "/youtube-to-mp3", label: "Open YouTube to MP3 tool" },
  },
  "where-do-youtube-downloads-go": {
    title: "Where Do YouTube Downloads Go on iPhone, Android & Desktop?",
    description: "Find out exactly where YouTube downloads save on iPhone, Android, Mac, and Windows — and how to access them.",
    datePublished: "2026-05-30",
    readTime: "4 min read",
    intro: "You downloaded a YouTube video and now... where is it? The answer depends on your device and which method you used. Here's the complete breakdown.",
    sections: [
      { h: "On iPhone (Safari downloads)", p: "When you download via Safari, files go to the Files app, in the iCloud Drive > Downloads folder by default. You can change this in Settings > Safari > Downloads. To save to your camera roll instead, open the file in Files, tap Share, then Save Video. The video then appears in the Photos app." },
      { h: "On Android (Chrome and others)", p: "Most Android browsers save downloads to the Downloads folder in internal storage. Open the Files or My Files app and look for Downloads. Some browsers (like Samsung Internet) let you change this in their settings. Videos saved this way don't automatically show up in your gallery — open them from Files or move them to the Pictures/Movies folder for gallery indexing." },
      { h: "On Mac", p: "Safari, Chrome, and Firefox all default to ~/Downloads. You can change this in each browser's settings. To find it fast: Cmd+Option+L in Safari opens the Downloads list directly. Files stay in Downloads forever unless you move them — Mac doesn't auto-delete." },
      { h: "On Windows", p: "Downloads land in C:\\Users\\YourName\\Downloads. Open File Explorer and Downloads is in the left sidebar. To change the default, go to Edge or Chrome settings > Downloads > Location." },
      { h: "From the official YouTube app (Premium)", p: "If you used YouTube Premium's built-in download, the video is NOT a regular file. It's encrypted and only playable inside the YouTube app, under Library > Downloads. You can't share it, transfer it, or play it in any other app. To get a real file, use a downloader that produces an MP4." },
    ],
    cta: { to: "/youtube-to-mp4", label: "Download a real MP4 file" },
  },
  "is-downloading-youtube-videos-illegal": {
    title: "Is Downloading YouTube Videos Illegal? What 2026 Actually Says",
    description: "A clear, non-legalese answer to whether downloading YouTube videos is legal — and the practical rules that actually matter.",
    datePublished: "2026-05-30",
    readTime: "5 min read",
    intro: "The honest answer: it depends, but it's almost never the user who gets in trouble. Here's what the rules actually say in 2026, and the practical lines you should not cross.",
    sections: [
      { h: "What YouTube's Terms of Service say", p: "YouTube's ToS prohibits downloading content unless a download button or link is shown by YouTube itself. That's a contract between you and YouTube — breaking it can get your Google account suspended, but it's not a criminal matter. Civil liability for ToS violations is virtually unheard of for individual users." },
      { h: "What copyright law says", p: "Copyright law is separate from YouTube's ToS. Downloading a copyrighted video for personal viewing (one copy, your own device, no sharing) falls under fair use in many jurisdictions — explicitly so in some EU countries (private copying exception), more ambiguously in the US. Downloading to redistribute, monetize, or use commercially is copyright infringement, full stop." },
      { h: "Public domain and Creative Commons", p: "Plenty of YouTube videos are explicitly free to download and reuse. Look for the Creative Commons license under the video (in the description's License field). Public-domain content (old films, government uploads, expired copyright) is also free game. NASA, the Library of Congress, and most government channels release everything freely." },
      { h: "The practical rules", p: "Downloading a music video so you can listen on a flight: nobody cares. Downloading a lecture to study offline: nobody cares. Downloading a movie clip for a film-school essay: protected by fair use in most countries. Downloading a film to upload to a piracy site: that's where the actual lawsuits start. Downloading a creator's full back catalogue and republishing it on your channel: also lawsuit territory." },
      { h: "What about creators?", p: "If you're a creator and you're worried about your own videos being downloaded — they will be, regardless of any tool's policy. The realistic protection is copyright enforcement (DMCA takedowns) when someone reuploads, not trying to block downloads at the source." },
    ],
    cta: { to: "/", label: "Try GrabTube" },
  },
};
