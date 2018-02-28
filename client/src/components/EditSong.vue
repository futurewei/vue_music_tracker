<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Song Metadata">
      <v-text-field
          label="Title"
          required
          :rules="[rules.required]"
          v-model="song.title"
        ></v-text-field>
        <v-text-field
          label="artist"
          required
          :rules="[rules.required]"
          v-model="song.artist"
        ></v-text-field>
        <v-text-field
          label="genre"
          required
          :rules="[rules.required]"
          v-model="song.genre"
        ></v-text-field>
        <v-text-field
          label="album"
          required
          :rules="[rules.required]"
          v-model="song.album"
        ></v-text-field>
        <v-text-field
          label="albumImage"
          required
          :rules="[rules.required]"
          v-model="song.albumImage"
        ></v-text-field>
         <v-text-field
          label="youtubeId"
          required
          :rules="[rules.required]"
          v-model="song.youtubeId"
        ></v-text-field>
    </panel>
    </v-flex>
    <v-flex xs8>
      <panel title = "Song Structure" class = "ml-2">
          <v-text-field
          label="tab"
          required
          :rules="[rules.required]"
          v-model="song.tab"
        ></v-text-field>
         <v-text-field
          label="lyrics"
          required
          :rules="[rules.required]"
          v-model="song.lyrics"
        ></v-text-field>
      </panel>

      <v-btn
        dark
        class = "light-blue"
        @click = "save"
        >
        save Songs
      </v-btn>
    </v-flex>
    </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  methods: {
    async save () {
      const songId = this.$store.state.route.params.songId
      try{
        await SongsService.put(this.song)
        this.$router.push({
            name: 'songs',
            params: {
            songId: songId
            }
        })
      } catch (err) {
          console.log(err)
      }
    }
  },
  async mounted () {
    //grab ID trick. whenever router changes in UI, route.params.songId changed as well in store..
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
