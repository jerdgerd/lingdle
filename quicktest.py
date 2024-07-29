import os
import json

# Path to the directory containing the audio files
audio_dir = 'LanguageAudio'

# Path to the JSON file
json_file_path = 'LanguageList.json'

# Load the JSON data
with open(json_file_path, 'r') as file:
    languages = json.load(file)

# List all audio files in the directory
audio_files = os.listdir(audio_dir)

# Extract the keys (language codes) from the JSON data
language_codes = languages.keys()

# Check for missing audio files
missing_languages = []
for code in language_codes:
    audio_filename = f"{code}.wav"
    if audio_filename not in audio_files:
        missing_languages.append(languages[code]['Language'])

# Print out the missing languages
if missing_languages:
    print("Missing audio files for the following languages:")
    for language in missing_languages:
        print(language)
else:
    print("All languages have corresponding audio files.")
