import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
  standalone:true,
  imports:[FormsModule]
})
export class CallComponent implements OnInit {
  private peer: Peer;
  peerIdShare?: string;
  peerId?: string;
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> = [];

  constructor() {
    this.peer = new Peer;
  }

  ngOnInit(): void {
    this.getPeerId();
  }

  private getPeerId() {
    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log('peerid', this.peerId);
    });
    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });

      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }

  connectWithPeer(): void {
    if (this.peerIdShare) {
      this.callPeer(this.peerIdShare);
    }


  }

  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    }).catch(err => {
      console.log(err + 'Unable to connect');
    });
  }

  private streamRemoteVideo(stream: MediaProvider | null) {
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = stream;
    video.play();

    const remoteVideo = document.getElementById('remote-video');
    if (remoteVideo !== null) {
      remoteVideo.append(video);
    } else {
      console.error("Element with ID 'remote-video' not found.");
    }
  }

  shareScreen() {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer.getSenders().find((s: { track: { kind: string; }; }) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
  }

  private stopScreenShare() {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find((s: { track: { kind: any; }; }) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }
}
