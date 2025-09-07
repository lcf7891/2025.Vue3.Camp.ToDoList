<template>
  <div class="mb-4">
    <label class="mb-1 text-sm font-bold" :for="id">{{ label }}</label>
    <input
      class="border-secondary w-full rounded-xl border bg-white px-4 py-3 outline-0 hover:border-white focus:border-white"
      :type="type"
      :name="id"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    modelModifiers: {
      // 處理修飾符
      type: Object,
      default: () => ({})
    },
    label: String,
    type: String,
    placeholder: String,
    id: String
  })

  const emit = defineEmits(['update:modelValue'])

  const updateValue = (e) => {
    let value = e.target.value
    // 支援 .trim
    if (props.modelModifiers.trim) {
      value = value.trim()
    }
    // 支援 .number
    if (props.modelModifiers.number) {
      value = Number(value)
    }
    emit('update:modelValue', value)
  }
</script>
