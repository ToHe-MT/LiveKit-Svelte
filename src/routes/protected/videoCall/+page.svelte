<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    const url = "wss://sattest-qx98pryz.livekit.cloud";
    const token = data.data;
    import { Room, Track, VideoPresets } from "livekit-client";
    import { onDestroy, onMount } from "svelte";
    // import VideoDisplay from './VideoDisplay.svelte';

    const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
            resolution: VideoPresets.h180.resolution,
        },
    });
    // room.prepareConnection(url, token);
    export let remoteVideoElement: HTMLElement | null;
    export let localVideoElement: HTMLElement | null;
    export let remoteAudioElement: HTMLElement | null;
    export let localAudioElement: HTMLElement | null;

    onMount(async () => {
        remoteVideoElement = document.getElementById("remoteVideo");
        localVideoElement = document.getElementById("localVideo");
        remoteAudioElement = document.getElementById("remoteAudio");
        localAudioElement = document.getElementById("localAudio");

        try {
            room.on("participantConnected", (participant) => {
                participant.on("trackSubscribed", (track) => {
                    if (track.kind === Track.Kind.Video) {
                        const remoteVideo = track.attach();

                        const remoteContainer = document.createElement("div");
                        remoteContainer.id = `remote-video-${track.sid}`;
                        remoteContainer.className = `remoteVideo`;

                        remoteContainer.append(remoteVideo);

                        const videoInfo = document.createElement("div");
                        videoInfo.textContent = `${participant.identity}`;
                        videoInfo.className = "remoteVideoText";

                        remoteContainer.appendChild(videoInfo);

                        remoteVideoElement?.append(remoteContainer);
                    }
                    if (track.kind === Track.Kind.Audio) {
                        const remoteAudio = track.attach();
                        remoteAudio.id = `remote-audio-${track.sid}`;
                        remoteAudioElement?.append(remoteAudio);
                    }
                });
            });
            room.on("trackUnsubscribed", (track) => {
                if (track.kind === "video") {
                    const remoteVideo = track.detach();
                    const remoteVideoElementId = `remote-video-${track.sid}`;
                    const childVideo =
                        document.getElementById(remoteVideoElementId);
                    if (childVideo && remoteVideoElement) {
                        remoteVideoElement.removeChild(childVideo);
                    }
                } else if (track.kind === "audio") {
                    const remoteAudio = track.detach();
                    const remoteAudioElementId = `remote-audio-${track.sid}`;
                    const childAudio =
                        document.getElementById(remoteAudioElementId);
                    if (childAudio && remoteAudioElement) {
                        remoteAudioElement.removeChild(childAudio);
                    }
                }
            });

            await room.connect(url, token);

            const allParticipants = room.participants;
            allParticipants.forEach((participant) => {
                const tracks = participant.getTracks();
                tracks.forEach((Newtrack) => {
                    const track = Newtrack.track;
                    if (track) {
                        if (track.kind === "video") {
                            const remoteVideo = track.attach();

                            const remoteContainer =
                                document.createElement("div");
                            remoteContainer.id = `remote-video-${track.sid}`;
                            remoteContainer.className = `remoteVideo`;

                            remoteContainer.append(remoteVideo);

                            const videoInfo = document.createElement("div");
                            videoInfo.textContent = `${participant.identity}`;
                            videoInfo.className = "remoteVideoText"; 

                            remoteContainer.appendChild(videoInfo);
                            
                            remoteVideoElement?.appendChild(videoInfo);
                        } else if (track.kind === "audio") {
                            const remoteAudio = track.attach();
                            remoteAudio.id = `remote-audio-${track.sid}`;
                            remoteAudioElement?.append(remoteAudio);
                        }
                    }
                });
            });

            await room.localParticipant.enableCameraAndMicrophone();
            const l = room.localParticipant.getTracks()[1].track;

            if (l) {
                const element = l.attach();
                localVideoElement?.append(element);
            }
        } catch (error) {
            console.error("Error connecting to LiveKit room:", error);
        }
    });

    onDestroy(() => {
        room.localParticipant.setCameraEnabled(false);
        room.localParticipant.setMicrophoneEnabled(false);
        room.disconnect();
    });

    let isMicrophoneEnabled = true;
    let isCameraEnabled = true;
    function toggleMicrophone() {
        isMicrophoneEnabled = !isMicrophoneEnabled;
        room.localParticipant.setMicrophoneEnabled(isMicrophoneEnabled);
    }

    function toggleCamera() {
        isCameraEnabled = !isCameraEnabled;
        room.localParticipant.setCameraEnabled(isCameraEnabled);
    }

    function quitMeeting() {
        // Perform any necessary cleanup before redirecting
        room.localParticipant.setCameraEnabled(false);
        room.localParticipant.setMicrophoneEnabled(false);
        room.disconnect();
        window.location.href = "/protected";
    }
</script>

<div id="mainContainer">
    <h1>Meeting Room</h1>

    <div id="videosContainer">
        <div id="localVideo">
            <!-- Add your local video content here -->
            <div id="localVideoText">You</div>
        </div>

        <div id="remoteVideo">
            <!-- Add your remote video content here -->
        </div>

        <div id="remoteAudio">
            <!-- Add your remote audio content here -->
        </div>

        <div id="localAudio">
            <!-- Add your local audio content here -->
        </div>
    </div>
    <div class="buttonContainer">
        <button on:click={toggleMicrophone}>
            {isMicrophoneEnabled ? "Disable Microphone" : "Enable Microphone"}
        </button>

        <button on:click={toggleCamera}>
            {isCameraEnabled ? "Disable Camera" : "Enable Camera"}
        </button>

        <button on:click={quitMeeting}>Quit Meeting</button>
    </div>
</div>

<style lang="css">
    h1 {
        color: #333;
        text-align: center;
    }

    #mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #videosContainer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
        margin-top: 20px;
    }

    #localVideo,
    #remoteVideo {
        position: relative;
        text-align: center;
    }

    #localVideoText {
        position: absolute;
        bottom: 10px; /* Adjust the distance from the bottom */
        right: 10px; /* Adjust the distance from the left */
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        pointer-events: none; /* To allow clicking through the text */
    }

    .remoteVideoText {
      position: absolute;
    bottom: 10px;
    left: 0px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    pointer-events: none;
    right: 0px;

    }

    button {
        margin: 5px;
        padding: 12px 18px;
        font-size: 14px;
        cursor: pointer;
        background-color: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0f52ba;
    }
</style>
