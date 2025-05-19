import os
import tempfile
import asyncio
import io

import numpy as np
import sounddevice as sd
from scipy.io.wavfile import write
from faster_whisper import WhisperModel
import edge_tts
from pydub import AudioSegment


# Load Whisper model once globally for STT
model = WhisperModel("base.en", compute_type="float32")
print("Whisper model loaded successfully.")


def speech_to_text(duration=7, sample_rate=16000):
    """
    Records audio from microphone and returns transcribed text using faster-whisper.

    Args:
        duration (int): Recording duration in seconds.
        sample_rate (int): Sample rate for audio.

    Returns:
        str: Transcribed text or error message.
    """
    try:
        print("Speak now...")

        # Record audio from mic
        audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
        sd.wait()

        # Convert to int16 for WAV format
        audio_int16 = np.int16(audio.flatten() * 32767)

        # Save to temporary WAV file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmpfile:
            write(tmpfile.name, sample_rate, audio_int16)
            temp_audio_path = tmpfile.name

        # Transcribe audio file
        segments, _ = model.transcribe(temp_audio_path)
        segments = list(segments)

        if not segments:
            print("No speech detected.")
            transcribed_text = ""
        else:
            for segment in segments:
                print(f"[{segment.start:.2f}s - {segment.end:.2f}s] {segment.text}")
            transcribed_text = ' '.join(segment.text.strip() for segment in segments)

        # Cleanup temp file
        os.remove(temp_audio_path)

        return transcribed_text

    except Exception as e:
        return f"An error occurred: {e}"


async def text_to_speech_and_play(text, voice="en-US-AriaNeural"):
    """
    Uses Microsoft Edge TTS to generate speech from text and plays audio live.

    Args:
        text (str): Text to speak.
        voice (str): Voice name to use (default "en-US-AriaNeural").

    Returns:
        None
    """
    communicator = edge_tts.Communicate(text, voice=voice)

    # Collect audio chunks from TTS stream
    audio_chunks = []
    async for chunk in communicator.stream():
        if chunk["type"] == "audio":
            audio_chunks.append(chunk["data"])

    # Concatenate MP3 byte chunks
    audio_data = b"".join(audio_chunks)

    # Convert MP3 bytes to raw PCM audio using pydub and io.BytesIO
    audio_segment = AudioSegment.from_file(io.BytesIO(audio_data), format="mp3")
    samples = np.array(audio_segment.get_array_of_samples())

    # Normalize to float32 for sounddevice playback
    audio_float32 = samples.astype(np.float32) / (2 ** 15)
    channels = audio_segment.channels
    sample_rate = audio_segment.frame_rate

    # If stereo, reshape accordingly for sounddevice (channels last)
    if channels > 1:
        audio_float32 = audio_float32.reshape((-1, channels))

    print(f"Playing audio: {len(audio_float32)} samples, {channels} channels, {sample_rate} Hz")

    # Play audio and wait until done
    sd.play(audio_float32, samplerate=sample_rate)
    sd.wait()


# Example usage for standalone running
if __name__ == "__main__":
    # STT example
    text = speech_to_text()
    print(f"Transcribed: {text}")

    # TTS example
    asyncio.run(text_to_speech_and_play("Hello! This is a Microsoft Edge text to speech example, playing live!"))
    # Note: The above example usage is for demonstration purposes and may not be suitable for all environments.

    #Download ffpeg for pydub
    # For Windows, you can download ffmpeg from https://ffmpeg.org/download.html
    # and add it to your PATH.

    #Following is how you would use the code above
#     from yourfilename import speech_to_text, text_to_speech_and_play

# # STT usage
# transcribed_text = speech_to_text(duration=5)

# # TTS usage
# import asyncio
# asyncio.run(text_to_speech_and_play(transcribed_text))
