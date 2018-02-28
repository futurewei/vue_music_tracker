<template>
  <div>
  <v-layout>
    <v-flex xs6>
    <song-metadata :song="song"/>
    </v-flex>

        <v-flex xs6 class="ml-2">
          <youtube :youtubeId="song.youtubeId"/>
        </v-flex>
  </v-layout>


<v-layout>      
    <v-flex xs6 class="mt-4">
      <panel title = "lyrics">
        <textarea
          readonly
          v-model = "song.lyrics"
          ></textarea>
      </panel>
    </v-flex>

    <v-flex xs6>
        </v-flex>
  </v-layout>

  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetadata from '@/components/VueSong/SongMetaData'
import Youtube from '@/components/VueSong/Youtube'
import {mapState} from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    //grab ID trick. whenever router changes in UI, route.params.songId changed as well in store..
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
      })
    }
  },
  components: {
    SongMetadata,
    Youtube
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

textarea {
  width: 80%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
