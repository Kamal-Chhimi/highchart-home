import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import PanTool from "@mui/icons-material/PanTool";
import { closestCenter, DndContext } from "@dnd-kit/core";
import MyStockChart from "./highchart1"; 
import MyLineChart from "./highchart2";
import MyBarChart from "./highchart3";
import MyAreaChart from "./highchart5";
import MyPieChart from "./highchart4";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid, Button, TextField, Typography, Box } from "@mui/material";

const SortablePaper = ({ id, activeId }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const transitionDuration = transition ? transition.duration : 0;
    const isDragging = activeId === id;
    const style = {
      transition: `transform ${transitionDuration}ms ease-in-out, background-color ${transitionDuration}ms ease-in-out`,
      transform: CSS.Transform.toString(transform),
      border: '1px solid black', 
      padding: '3vh', 
      borderRadius: '8px',
      cursor: "grab", 
      backgroundColor: isDragging ? "#f1f1f1" : "transparent", 
      margin:"2vh", 
    //   width:"20vw",
    //   height:"60vh",
    };
  
    let chartComponent;
    switch (id) {
      case '1':
        chartComponent = <MyStockChart />;
        break;
      case '2':
        chartComponent = <MyLineChart />;
        break;
      case '3':
        chartComponent = <MyBarChart />;
        break;
      case '4':
        chartComponent = <MyAreaChart />;
        break;
      case '5':
        chartComponent = <MyPieChart />;
        break;
      default:
        chartComponent = null;
    }
  
    return (
      <Paper ref={setNodeRef} style={style} {...attributes} {...listeners} elevation={100}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4"> {id} </Typography>
          <PanTool sx={{ fontSize: "3.5vh", cursor: "grab" }} />
        </Box>
        {chartComponent}
      </Paper>
    );
  };
  

const Users = () => {
  const [papers, setPapers] = useState(() => {
    const savedPapers = localStorage.getItem("papers");
    return savedPapers ? JSON.parse(savedPapers) : [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
  });
  const [newChartId, setNewChartId] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("papers", JSON.stringify(papers));
  }, [papers]);

  const onDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (active.id === over.id) {
      return;
    }
    setPapers((papers) => {
      const oldIndex = papers.findIndex((paper) => paper.id === active.id);
      const newIndex = papers.findIndex((paper) => paper.id === over.id);
      return arrayMove(papers, oldIndex, newIndex);
    });
  };

  const addChart = () => {
    if (newChartId.trim()) {
      setPapers([...papers, { id: newChartId.trim() }]);
      setNewChartId("");
    }
  };

  const removeChart = (id) => {
    setPapers(papers.filter((paper) => paper.id !== id));
  };

  return (
    <Box className="users">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "2vh" , flexDirection:"row" ,  border: '1px solid black', padding: '16px', borderRadius: '8px',  }}>
        <Typography variant="h3" align="center">Total: {papers.length}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TextField
            label="New Chart ID"
            value={newChartId}
            onChange={(e) => setNewChartId(e.target.value)}
          />
          <Button onClick={addChart}>Add Chart</Button>
        </Box>
      </Box>
      <Box>
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <SortableContext items={papers} strategy={verticalListSortingStrategy}>
            <Grid container spacing={2}>
              {papers.map((paper) => (
                <Grid item  xs={12} sm={3} md={3} key={paper.id} >
                  <SortablePaper id={paper.id} activeId={activeId} />
                  <Button sx={{margin:"0px 20px" , fontWeight:"bold" , fontSize:"0.8vw"}} onClick={() => removeChart(paper.id)}>Remove</Button>
                </Grid>
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default Users;
