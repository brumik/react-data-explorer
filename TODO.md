# TODO

## Chart Builder 
The chart builder component todo entries

### High Priority
- ?

### Interactive legend TODO and bugs
* Interactive legend for Pie Charts (And probably for BulletChart and Donut Chart too)
    * The pie chart  is consisting of one series, but every object in that series represents a slice.
    * The wrapper logic remains mostly the same but we should deal with filtering out the objects FROM the series
* Interactive legend for multiple charts from one series
    * Eg.: line chart where we have one series and we are using two different attributes for each line
    * I think maybe we should sacrifice memory and just duplicate the data as if it were two series, so basically
    we will have a data set for each chart we are displaying, no matter if the data is duplicated
* [NOHOPE] interactive legend - hover
    * the event props on the wrapper should have: `chartNames`
    * the LegendComponent should have `childName` for the corresponding data set (one from `chartNames`)
    * The `createChart` component should have `name` prop
    * All of theese seems to be set correctly, the `legend` from the API is updated with a `childName` prop,
    in addition when getting data from the API each series has an unique `name` string assingned to it, ensuring that 
    the props will remain unique, and providing the same `name` for the different components in an uniform way.

### Feature
* Legend type charts --> similar to pie chart, one component
    * Add a vertical legend/progress chart
* custom legend options
    * (usefull when we need postprocess the legend the API will send)

### Bug
* the legend shows doubled when its applied to the chart and the values for multiple series is the same

### Code organization
* deep merge the objects with default values

### Low Priority & Todo
* parent to children hierarchy (think about it)
    * Pro: More readable maybe
    * Con: The generation from template will be much more complicated as we need unique keys for each of them.

### Api requirement
* Send labels with the data.
* Send legend with the meta data
* Best case: send in the meta data in an uniformed way how the data should be processed
    * I have no concrete idea, but something like how deep it is grouped or some other flags
    so we know how to process the data.
* Switch to chart format?
    * This would be a query param, which would require the api, to convert the data into
    a format which doesn't need more postprocessing before passing to the chart.
* Empty strings in the names --> placeholder?