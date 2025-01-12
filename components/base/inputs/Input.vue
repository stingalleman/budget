<template>
  <label>
    <span v-if="label">{{ label }}</span>
    <div :class="['wrapper', prefix ? 'auto-fr' : '']">
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <textarea
        v-if="type === 'textarea'"
        :type="type"
        :min="min"
        :max="max"
        :value="value"
        :placeholder="placeholder"
        :class="[doAltBg ? 'do-alt-bg' : '', isFocused && 'focused']"
        @input="setChange"
        @focus="doFocus"
        @blur="doBlur"
      />
      <div
        v-else-if="type === 'list'"
        class="list-input"
        :class="[doAltBg ? 'do-alt-bg' : '', isFocused && 'focused']"
      >
        <div
          v-for="(tag, i) of tagList"
          :key="`${tag}-${i}`"
          class="tag"
          @click="() => removeTag(tag)"
        >
          <span :style="getTagColor(tag)"><trash-icon /></span>
          {{ tag.slice(0, 1).toUpperCase() }}{{ tag.slice(1) }}
        </div>
        <input
          ref="adjustable-input"
          v-model="otherValue"
          type="text"
          :min="min"
          :max="max"
          :placeholder="placeholder"
          @keyup="listInputEvent"
          @focus="doFocus"
          @blur="doBlur"
          @input="setInputWidth"
          @change="setInputWidth"
        />
      </div>
      <input
        v-else
        :type="type"
        :min="min"
        :max="max"
        :value="value"
        :placeholder="placeholder"
        :class="[doAltBg ? 'do-alt-bg' : '', isFocused && 'focused']"
        @input="setChange"
        @focus="doFocus"
        @blur="doBlur"
      />
    </div>
  </label>
</template>

<style lang="scss" scoped>
* {
  max-width: 100%;
  overflow: hidden;
}
label {
  display: grid;
}
.wrapper > input,
.wrapper > textarea,
.list-input {
  border: 0;
  padding: 8px;
  border-radius: 6px;
  background: var(--content);
  color: var(--text);
  display: block;
  width: 100%;
  font-size: 1rem;
  appearance: none;
  font-family: inherit;
  resize: none;
  text-align: left;

  &.focused {
    outline-color: rgb(77, 144, 254); // #4D90FE
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }

  &.do-alt-bg {
    background: var(--body);
    border: 1px solid var(--border);
  }
}

*:focus {
  outline: none;
}

.list-input input {
  padding: 0;
  border: 0;
  font-size: 1rem;
  background: transparent;
  color: var(--text);
}

textarea {
  height: 100px;
  min-height: 50px;
  max-height: 250px;
  overflow-y: auto;
  resize: vertical;
}
span {
  color: var(--text-secondary);
}
.auto-fr {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: center;
}

.list-input {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .tag {
    padding: 0 3px;
    border-radius: 1px;
    background: var(--alt-content);
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      background: var(--disabled-content);
    }

    svg {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>

<script>
// Import icons
import TrashIcon from '~/assets/icons/trash.svg?inline'

// Import colors
import { colors } from '~/store/user'

export default {
  components: {
    TrashIcon,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    value: {
      type: [String, Date],
      required: true,
    },
    min: {
      type: String,
      required: false,
      default: undefined,
    },
    max: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    doAltBg: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      otherValue: '',
      isFocused: false,
    }
  },
  computed: {
    tagList() {
      return this.value
        .split(', ')
        .map((v) => v.trim())
        .filter(Boolean)
    },
  },
  methods: {
    setChange(evt) {
      this.$emit('input', evt.currentTarget.value)
      this.$emit('change', evt)
    },
    listInputEvent(evt) {
      const currentList = this.value
        .split(', ')
        .map((v) => v.trim())
        .filter(Boolean)

      if (evt.key === 'Enter' || evt.key === ',') {
        currentList.push(this.otherValue.replace(/,/g, ''))
        this.otherValue = ''
      }

      const newValue = [...new Set(currentList)]
        .map((v) => v.toLowerCase().trim())
        .join(', ')
      if (newValue !== this.value) this.$emit('input', newValue)
    },
    doFocus() {
      this.isFocused = true
      this.setInputWidth()
    },
    doBlur() {
      this.isFocused = false
    },
    setInputWidth() {
      const input = this.$refs['adjustable-input']
      if (input) input.style.width = Math.max(input.value.length, 16) + 'ch'
    },
    removeTag(tag) {
      const currentList = this.value
        .split(', ')
        .map((v) => v.trim())
        .filter(Boolean)
        .filter((v) => v !== tag)

      const newValue = currentList.join(', ')
      if (newValue !== this.value) this.$emit('input', newValue)
    },
    getTagColor(tag) {
      const tagColors = this.$store.state.user.tagColors
      const color =
        tagColors[tag.toLowerCase().trim()] ??
        colors[tag.length % colors.length]

      return `color: ${color};`
    },
  },
}
</script>
