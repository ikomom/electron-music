<script>
import {filterEmpty} from "@/utils/props-utils";

export default {
  name: "MSpace",
  functional: true,
  props: {
    size: {
      type: Number,
      default: 8
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].includes(val);
      }
    },
    align: {
      type: String,
      default: 'start',
      validator(val) {
        return ['start', 'end', 'center', 'baseline'].includes(val);
      }
    },
  },
  render(h, content) {
    const {
      children,
    } = content;
    const {align, size, direction} = content.props;
    const prefixCls = 'space';
    const items = filterEmpty(children);
    const len = items.length;

    if (len === 0) {
      return null;
    }

    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;

    const someSpaceClass = [
      {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        // [`${prefixCls}-rtl`]: directionConfig === 'rtl',
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      },
    ];
    if (content.data.class) {
      someSpaceClass.push(content.data.class);
    }

    const itemClassName = `${prefixCls}-item`;
    const marginDirection = 'marginRight';

    return (
      <div {...content.data} class={someSpaceClass}>
        {items.map((child, i) => (
          <div
            class={itemClassName}
            key={`${itemClassName}-${i}`}
            style={
              i === len - 1
                ? {}
                : {
                  [direction === 'vertical' ? 'marginBottom' : marginDirection]: `${size}px`,
                }
            }
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
}
</script>

<style scoped lang="scss">
.space {
  display: inline-flex;
  &-vertical {
    flex-direction: column;
  }

  &-align {
    &-center {
      align-items: center;
    }
    &-start {
      align-items: flex-start;
    }
    &-end {
      align-items: flex-end;
    }
    &-baseline {
      align-items: baseline;
    }
  }
}

</style>