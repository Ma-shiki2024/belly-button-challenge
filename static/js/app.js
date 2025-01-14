// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    let numString = sample;
    let numInt = parseInt(numString); 
    // get the metadata field
    let metadata = data["metadata"]
    // Filter the metadata for the object with the desired sample number
    const samplemetadata = metadata.find(d => d.id === numInt);

    console.log(metadata)

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.


      // For each sample, iterate over its key-value pairs
      for (const [key, value] of Object.entries(samplemetadata)) {
        // Append each key-value pair to the output
        d3.select("#sample-metadata")
          .append("p")
          .text(`${key}: ${JSON.stringify(value)}`);
      }


  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {




    // Get the samples field
    let samples = data["samples"]
    console.log(sample)
    // Filter the samples for the object with the desired sample number
    const sample942 = samples.find(d => d.id === sample);

    console.log(sample942)

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = sample942["otu_ids"];
    const otu_labels = sample942["otu_labels"];
    const sample_values = sample942["sample_values"];

    // Build a Bubble Chart

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color : otu_ids
      }
    };
    
    var data = [trace2];
    
    var layout = {
      title: {
        text: 'Bacteria Cultures per Sample'
      },
      xaxis: {

        title: 'OTU ID'
    
      },
      yaxis: {

        title: 'Number of Bacteria'
    
      },
      showlegend: false,
      height: 600,
      width: 1200,
      
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Get the first sample from the list



    // Build charts and metadata panel with the first sample

    firstSample = data["samples"]

    let firstOtuId = samples.find(d => d.id === sample);

    

        // Slice the first 10 objects for plotting
    let slicedData = firstOtuId["otu_ids"].slice(0, 10);

    const modifiedData = slicedData.map(d => "OTU " + d );
    console.log(modifiedData)

    // Reverse the array to accommodate Plotly's defaults
    //modifiedData.reverse();



        // Trace1 for the Greek Data
    let trace1 = {
      x: firstOtuId["sample_values"],
      y: modifiedData ,
      text: firstOtuId["otu_labels"],
      name: "Top 10 Bacteria culture found",
      type: "bar",
      orientation: "h"
    };

    let myData = [trace1]
    // Apply a title to the layout
    let layout2 = {
      title: "Top 10 Bacteria culture found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    console.log(firstOtuId)

    Plotly.newPlot("bar", myData, layout2);

        // Build a Bar Chart
        // Don't forget to slice and reverse the input data appropriately


        // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
   

    sampleNames = data["names"];

    // Use d3 to select the dropdown with id of `#selDataset`
     // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    dropdownMenu.selectAll("option")
    .data(sampleNames)
    .enter()
    .append("option")
    .text(d=>d)
    .attr("value",d=>d );

    buildCharts("940");
    buildMetadata("940")


  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  
  console.log("Selected value:", newSample);
  buildCharts(newSample);
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
