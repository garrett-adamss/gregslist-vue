<template>
  <form @submit.prevent="handleSubmit()" class="car-form">
    <h3 class="text-primary">List Your Car</h3>
    <div class="row">

      <div class="col-4">
        <label class="form-label" for="bedrooms">bedrooms</label>
        <input class="form-control" type="text" minlength="5" id="bedrooms" name="bedrooms" v-model="editable.make">
      </div>

      <div class="col-4">
        <label class="form-label" for="model">Model</label>
        <input class="form-control" type="text" id="model" name="model" v-model="editable.model">
      </div>

      <div class="col-4">
        <label class="form-label" for="year">Year</label>
        <input class="form-control" type="number" id="year" name="year" min="1999" v-model="editable.year">
      </div>

      <label class="form-label" for="price">Price</label>
      <input class="form-control" type="number" min="1000" id="price" name="price" v-model="editable.price">

      <label class="form-label" for="img">Image</label>
      <input class="form-control" type="text" id="img" name="img" v-model="editable.img">

      <label class="form-label" for="description">Description</label>
      <textarea class="w-100 form-control" name="description" id="description" rows="5"
        v-model="editable.description"></textarea>

      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { carsService } from '../services/CarsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    // TODO come back to this in one sec for edits
    watchEffect(() => {
      //               v ... is used to break reference
      if (!AppState.activeCar) { return } // stop
      editable.value = { ...AppState.activeCar }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            houseService.editCar(editable.value)
          } else {
            houseService.createCar(editable.value)
          }
          editable.value = {} // clears the form
        } catch (error) {
          logger.error('[Creating or Editing Car]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
