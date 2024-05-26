import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import MiniDrawer from "../Home/SideBar";
import { drawerState } from "../../GlobalState";
import { useRecoilValue } from "recoil";
import TemperatureVariationChart from "./highchart1";
import MyColumnChart from "./highchart2";
import ColumnChartWithNegativeValues from "./highchart3";
import PieChartResponsive from "./highchart4";
import EmissionsChart from "./highchart5";
import PieChart3DResponsive from "./highchart6";
// import SmartphoneShipmentsChart from "./highchart7";

const SortablePaper = ({ id, activeId, isDraggable }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const transitionDuration = transition ? transition.duration : 0;
  const isDragging = activeId === id;
  const style = {
    transition: `transform ${transitionDuration}ms ease-in-out, background-color ${transitionDuration}ms ease-in-out`,
    transform: CSS.Transform.toString(transform),
    cursor: isDraggable ? "grab" : "pointer",
    backgroundColor: isDragging ? "#f1f1f1" : "transparent",
    margin: "1vh",
    position: "relative",
    height: "36vh",
  };

  let chartComponent;
  switch (id) {
    case "1":
      chartComponent = <TemperatureVariationChart />;
      break;
    case "2":
      chartComponent = <MyColumnChart />;
      break;
    case "3":
      chartComponent = <ColumnChartWithNegativeValues />;
      break;
    case "4":
      chartComponent = <PieChartResponsive />;
      break;
    case "5":
      chartComponent = <EmissionsChart />;
      break;
    case "6":
      chartComponent = <PieChart3DResponsive />;
      break;
    default:
      chartComponent = null;
  }

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={10}
    >
      {chartComponent}
    </Paper>
  );
};

const Users1 = () => {
  const [papers, setPapers] = useState(() => {
    const savedPapers = localStorage.getItem("papers");
    return savedPapers
      ? JSON.parse(savedPapers)
      : [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
          { id: "6" },
        ];
  });
  const [activeId, setActiveId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggable, setIsDraggable] = useState(() => {
    const savedIsDraggable = localStorage.getItem("isDraggable");
    return savedIsDraggable ? JSON.parse(savedIsDraggable) : false;
  });
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSMOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isSideBarOpen = useRecoilValue(drawerState);
  const isMDOrSmaller = useMediaQuery(theme.breakpoints.down('lg'));


  useEffect(() => {
    localStorage.setItem("papers", JSON.stringify(papers));
  }, [papers]);

  useEffect(() => {
    localStorage.setItem("isDraggable", JSON.stringify(isDraggable));
  }, [isDraggable]);

  const onDragStart = (event) => {
    setActiveId(event.active.id);
    setIsDragging(true);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);
    if (!active || !over || active.id === over.id) {
      return;
    }

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

  const addChart = (id) => {
  setPapers((prevPapers) => [...prevPapers, { id }]);
};


  const removeChart = (id) => {
    const deletedIndex = papers.findIndex((paper) => paper.id === id);
    const deletedChart = papers[deletedIndex];

    setLastDeletedChart(deletedChart);
    setLastDeletedIndex(deletedIndex);

    setPapers(papers.filter((paper) => paper.id !== id));
  };

  const availableCharts = ["1", "2", "3", "4", "5", "6"].filter(
    (id) => !papers.some((paper) => paper.id === id)
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [lastDeletedChart, setLastDeletedChart] = useState(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);

  const handleUndoDelete = () => {
    if (lastDeletedChart !== null && lastDeletedIndex !== null) {
      setPapers((prevPapers) => {
        const newPapers = [...prevPapers];
        newPapers.splice(lastDeletedIndex, 0, lastDeletedChart);
        return newPapers;
      });
      setLastDeletedChart(null);
      setLastDeletedIndex(null);
    }
    setOpen(false);
  };


 return (
  <Box className="users" sx={{ display: "flex" }}>
    <MiniDrawer />
    <Box sx={{ width: "100%", display: isSMOrSmaller && isSideBarOpen && "none" }}>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "1vh 1vh",
          flexDirection: "row",
          border: "1px solid black",
          borderRadius: "8px",
          padding: "1vh"
        }}
      >
        <Typography variant="h4" align="center">
          Total: {papers.length}
        </Typography>

        {availableCharts.length > 0 ? (<Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Select
            value=""
            onChange={(e) => addChart(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select Chart</em>;
              }
              return selected;
            }}
            sx={{ height: "5vh" }}
          >
            <MenuItem disabled value="">
              <em>Select Chart</em>
            </MenuItem>
            {availableCharts.map((id) => (
              <MenuItem key={id} value={id}>
                Chart {id}
              </MenuItem>
            ))}
          </Select> </Box>) : ""}

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <label>
            Enable Drag and Drop
          </label>
          <input
            type="checkbox"
            checked={isDraggable}
            onChange={(e) => setIsDraggable(e.target.checked)}
          />
        </Box>

      </Box>
      {isDraggable ? (
        <Box sx={{ padding: "1vh" }}>
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={papers}
              strategy={verticalListSortingStrategy}
            >
              <Grid container spacing={2}>
                {papers.map((paper, index) => {
                  let gridColumn;
                  if (index < 3) {
                    gridColumn = 4;
                  } else if (index < 5) {
                    gridColumn = 6;
                  } else {
                    gridColumn = 12;
                  }

                  return (
                    <Grid item xs={12} sm={isMDOrSmaller ? 6 : gridColumn} key={paper.id}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          position: "absolute",
                          zIndex: "10",
                          margin: "2vh",
                          display: isDragging ? "none" : "flex",
                        }}
                      >
                        <IconButton
                          style={{ zIndex: 10 }}
                          onClick={() => {
                            removeChart(paper.id);
                            handleClick();
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                      <SortablePaper id={paper.id} activeId={activeId} isDraggable={isDraggable} />
                    </Grid>
                  );
                })}
              </Grid>
            </SortableContext>
          </DndContext>
        </Box>
      ) : (
        <Box sx={{ padding: "1vh" }}>
          <Grid container spacing={2}>
            {papers.map((paper, index) => {
              let gridColumn;
              if (index < 3) {
                gridColumn = 4;
              } else if (index < 5) {
                gridColumn = 6;
              } else {
                gridColumn = 12;
              }

              return (
                <Grid item xs={12} sm={isMDOrSmaller ? 6 : gridColumn} key={paper.id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      position: "absolute",
                      zIndex: "10",
                      margin: "2vh",
                      display: isDragging ? "none" : "flex",
                    }}
                  >
                    <IconButton
                      style={{ zIndex: 10 }}
                      onClick={() => {
                        removeChart(paper.id);
                        handleClick();
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  <SortablePaper id={paper.id} activeId={activeId} isDraggable={isDraggable} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          action={
            <Button color="inherit" size="small" onClick={handleUndoDelete}>
              UNDO
            </Button>
          }
        >
          Highchart deleted successfully
        </Alert>
      </Snackbar>
    </Box>
  </Box>
);

  
};

export default Users1;

//tole3 kl l badda howe zabet l design l ykouno wadhin visually zabtin/ fiye jarreb zabeton 3al zoom in zoom out bs ma aletle he  chi bl zabet
//balke hatet enno l screen bs tozghar awl row ykoun fi two mesh three highchart
//zabbet l sidebare enno bs tozghar l screnn te5tede , aw bl mobile view tsir position l ela absolute aw z-index high....
//h sewe kel l highshart nafs l type , zabbetlo shaklo ykoun wadeh bas zagher l screen w kabbera .
//badde shouf iza sta3malet highchart from the official website ia afdal aw la....balke tol3o artab w aktar visual

//2a3mel enno fiye zid features 3 kl highchart : fiye sewiya masalan k select option w be2dar ghayerl visualze lal data b albon..
 //ma ba33ref kamen shu alet visual w ma visual

