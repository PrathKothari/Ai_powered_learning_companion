import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
from faster_whisper import WhisperModel
import os
import tempfile

# Load the model once (outside the function for reusability)
model = WhisperModel("base.en")  # You can switch to "tiny.en" for faster performance

def speech_to_text(duration=10, sample_rate=16000):
    """
    Records audio from microphone and returns transcribed text using faster-whisper.
    
    Args:
        duration (int): Recording duration in seconds.
        sample_rate (int): Sample rate for audio.

    Returns:
        str: Transcribed text.
    """
    print("🎤 Speak now...")

    # Record audio
    audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
    sd.wait()

    # Convert float32 audio to int16 format
    audio_int16 = np.int16(audio.flatten() * 32767)

    # Save to a temporary WAV file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmpfile:
        write(tmpfile.name, sample_rate, audio_int16)
        temp_audio_path = tmpfile.name

    # Transcribe with faster-whisper
    segments, _ = model.transcribe(temp_audio_path)

    # Combine segments into a single string
    transcribed_text = ' '.join(segment.text for segment in segments)

    # Clean up temp file
    os.remove(temp_audio_path)

    return transcribed_text
