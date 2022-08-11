import Select2 from 'vue3-select2-component';
<template>
  <div class="container">
    <img src="../assets/logo-energeek.png" />
    <div class="content-form">
      <h3>Apply Lamaran</h3>
      <form class="form">
        <div>
          <label>Nama</label>
          <div class="input-group mb-3">
            <input
              v-model="name"
              type="text"
              name="name"
              placeholder="Cth: Ahmad Afif Mudhofar"
            />
          </div>
        </div>
        <div>
          <label>Jabatan</label>
          <div class="input-group mb-3">
            <select v-model="job" class="form-select" placeholder="test">
              <option selected>Pilih Jabatan</option>
              <option v-for="job in joblist" :value="job.id">
                {{ job.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label>Telepon</label>
          <div class="input-group mb-3">
            <input
              v-model="phone"
              type="number"
              name="phone"
              placeholder="Cth: 082234925007"
            />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div class="input-group mb-3">
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder="Cth: energeekmail@gmail.com"
            />
          </div>
        </div>
        <div>
          <label>Tahun Lahir</label>
          <div class="input-group date mb-3" data-provide="datepicker">
            <input v-model="birth_year" type="date" name="birth_year" />
          </div>
        </div>
        <div>
          <label>Skill Set</label>
          <div class="input-group mb-3">
            <select v-model="skill" class="form-select" multiple>
              <option selected>Pilih Skill</option>
              <option v-for="skill in skilllist" :value="skill.id">
                {{ skill.name }}
              </option>
            </select>
          </div>
        </div>
        <!-- ============== -->
        <!-- BELUM BISA PAKAI AdminLTE 🙏🏻🙏🏻🙏🏻 -->
        <!-- <div>
          <label>Skill Set</label>
          <div class="input-group mb-3">
            <Select2
              v-model="skill"
              class="form-select"
              v-for="skill in skilllist"
              :value="skill.id"
            >
              <h4>Value: {{ skill }}</h4>
              <option selected>Pilih Skill</option>
              <option v-for="skill in skilllist" :value="skill.id">
                {{ skill.name }}
              </option>
            </Select2>
          </div>
        </div> -->
        <!-- ============== -->
        <button @click="submit" class="btn btn-apply">Apply</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
export default {
  setup() {
    return {
      name: ref(""),
      job: ref("Pilih Jabatan"),
      phone: ref(""),
      birth_year: ref(""),
      skill: ref("Pilih Skill"),
      joblist: ref([]),
      skilllist: ref([]),
    };
  },
  //   data() {
  //     return {
  //       skill: "",
  //       myOptions: [{ id: key, text: value }],
  //     };
  //   },
  mounted() {
    axios
      .get(
        "http://demo73.energeek.co.id/energeek-frontend-test/public/api/select_list/job?search"
      )
      .then((response) => (this.joblist = response.data.data.jobs));
    // console.log("This JobList =>",this.joblist);
    axios
      .get(
        "http://demo73.energeek.co.id/energeek-frontend-test/public/api/select_list/skill?search"
      )
      .then((response) => (this.skilllist = response.data.data.skills));
    // console.log("This SkillList =>",this.skilllist);
  },
  methods: {
    submit(event) {
      event.preventDefault();
      const Swal = require("sweetalert2");

      console.log({
        name: this.name,
        job_id: this.job,
        phone: this.phone,
        birth_year: this.birth_year.split("-")[0],
        email: this.email,
        skill_id: this.skill,
      });
      axios
        .post(
          "http://demo73.energeek.co.id/energeek-frontend-test/public/api/recruitment",
          JSON.stringify({
            name: this.name,
            job_id: this.job,
            phone: this.phone,
            birth_year: this.birth_year.split("-")[0],
            email: this.email,
            skill_id: this.skill,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) =>
          Swal.fire({
            confirmButtonText: "Selesai",
            showCloseButton: true,
            icon: "success",
            confirmButtonColor: "#1BC5BD",
            title: "Berhasil!",
            text: "Lamaran berhasil dikirim.",
          })
        )
        .catch((err) =>
          Swal.fire({
            confirmButtonText: "Baiklah",
            showCloseButton: true,
            icon: "warning",
            confirmButtonColor: "#F64E60",
            title: "Terjadi Kesalahan!",
            text: "Email yang anda masukkan sudah pernah melamar dijabatan tersebut, silahkan memilih jabatan yang lain.",
          })
        );
    },
  },
};
</script>

<style>
@import "../index.css";
</style>
