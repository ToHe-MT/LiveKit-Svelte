<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    const url = "wss://sattest-qx98pryz.livekit.cloud";
    const token = data.data;
    import {
        LocalParticipant,
        LocalTrackPublication,
        Participant,
        RemoteParticipant,
        RemoteTrack,
        RemoteTrackPublication,
        Room,
        RoomEvent,
        Track,
        VideoPresets,
    } from "livekit-client";
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

    onMount(async () => {
        remoteVideoElement = document.getElementById("remoteVideo");
        localVideoElement = document.getElementById("localVideo");
        try {
            room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
                .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
                .on(RoomEvent.Disconnected, handleDisconnect)

            room.on("participantConnected", (participant) => {
                participant.on("trackPublished", (track) => {
                    handleTrackSubscribed;
                });
            });
            await room.connect(url, token);
            console.log("connected to room", room.name);

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
        console.log("Quitting")
    });

    room.on("participantConnected", (participant) => {
        console.log(participant, "NEW PARTICIPANT")
    });

    function handleTrackSubscribed(
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
    ) {
        if (track.kind === Track.Kind.Video) {
            console.log("New Video Incoming");
        }
    }

    function handleTrackUnsubscribed(
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
    ) {
        console.log("SOMEONE QUITTING")
        track.detach();
    }

    function handleDisconnect() {
        console.log("disconnected from room, should destroy the track");
    }
</script>

<h1>Meeting Room</h1>
<div id="localVideo"></div>

<div>
    {#if remoteVideoElement}
        <h2>Remote Video</h2>
        <!-- svelte-ignore a11y-media-has-caption -->
        <video autoplay></video>
    {/if}
</div>

<style>
    video {
        width: 100%;
        max-width: 300px;
        margin: 10px;
    }
</style>