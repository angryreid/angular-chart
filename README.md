# Angualr Chart

## Bug List

ERROR 1 
`Error: This method is not implemented: Check that a complete date adapter is provided.`
Fix: https://stackoverflow.com/questions/67017539/timeseries-scale-in-chartjs-3-0-2-brings-error-this-method-is-not-implemented

ERROR 2
`/@types/node/index.d.ts (20,1): Invalid 'reference' directive syntax.`

Fix; https://blog.csdn.net/jcmj123456/article/details/115479595

ERROR 3
`'time' is not regesitered.`
Fix: import `Chart` from `chart.js/auto`

ERROR 4
`core.mjs:6494 ERROR Error: This method is not implemented: Check that a complete date adapter is provided`
Fix: https://github.com/rusminto/chartJs3Time/blob/main/src/components/HorizontalChart.vue

## TO DO

### 1. X labels issue when switching market.

### 2. X labels adjustment

```ts
let start = getCurrentByTimeZone(Number(list[0].stockDatetimeStamp), this.utcOffset).unix() * 1000;
          const end = Number(list[list.length - 1].stockDatetimeStamp);
          let labels = [start];
          while (start < end) {
            start = moment(start).utcOffset(this.utcOffset).add(2, 'h').unix() * 1000;
            labels.push(start);
          }
          this.context.dataLabels = labels;
```

### 3. Responsive Lable value
