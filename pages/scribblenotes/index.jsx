import React, { useEffect, useState, useRef } from "react";
import PouchDB from "pouchdb";
import _, { isNumber } from "lodash";
import { CirclePicker as CircleColorPicker } from "react-color";
import { v1 as uuid } from "uuid";
import { Button } from "@mui/material";
import Image from "next/image";
import BtImage from "../../components/btimage/BtImage";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import { useOutsideAlerter } from "../../hook/outSideClickHandler";
import { Langauges } from "../../utils/scribblenotes/langauges";
import RippleButton from "../../components/rippleButton/RippleButton";

import styles from "./scribbleNotes.module.css";
import { Input } from "postcss";

const SIDEBAR_STATIC_W_H_CLASS =
  "w-[50px] h-[50px] flex items-center justify-center";

const ScribbleNotes = () => {
  const [notes, setNotes] = useState([]);
  const [clone, setClone] = useState([])
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [notesObj, setNotesObj] = useState(null);
  // console.log(notesObj, "notesObjnotesObj");
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedFilterLabel, setSelectedFilterLabel] = useState(null);
  const [archive, setArchive] = useState(false)
  const [labels, setLabels] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [searchedLabel, setSearchedLabel] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showEditColorModal, setShowEditColorModal] = useState(null);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  const [showTranslationDropdown, setShowTranslationDropdown] = useState(null);
  const [selectedTranslateLang, setSelectedTranslateLang] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [selectedSideBar, setSelectedSideBar] = useState("home");
  const addNoteColorModalWrapperRef = useRef(null);
  const addNoteTranslateWrapperRef = useRef(null);
  const addEditNoteColorModalWrapperRef = useRef(null);
  const [searched,setSearched]= useState()
  const[langaugeList,setLanguageList] = useState({})
  const[langaugeStaticList,setLanguageStaticList] = useState({})

  //  console.log(searched,"searchedFilter")
 

  const onAddNewNote = () => {
    handleSelectNote({})();
  };

  const handleSelectNote = (note) => {
    return () => {
      setOpenNoteModal(true);
      setNotesObj(note);
      resetTranslateDropdown()
    };
  };

  const handleChange = (evt) => {
    const notesObjState = JSON.parse(JSON.stringify(notesObj));
    notesObjState[evt.target.name] = evt.target.value;
    setNotesObj(notesObjState);
  };

  const onSideBarView = (sideBarValue) => {
    setSelectedSideBar(sideBarValue)
  }

  const onToggleArchiveView = (archiveView) => {
    setShowArchivedNotes(archiveView);
    setOpenNoteModal(false);
    setNotesObj(null);
    setSelectedFilterLabel(null);
  };

  const toggleTranslateDropdown = () => {
    setShowTranslationDropdown(prevState => (prevState == "Y" || !prevState) ? "N" : "Y");
  }
  const onFocusChange = ()=>{
    setShowTranslationDropdown('Y')
  }

  const resetTranslateDropdown = () => {
    setShowTranslationDropdown(null);
    setTranslatedContent("");
    setSelectedTranslateLang("")
  }

  const closeNotes = () => {
    setOpenNoteModal(false);
    setNotesObj(null);
    resetTranslateDropdown()
  }

  const saveNotes = (notesData) => {
    if (!notesData) return;
    const db = new PouchDB("ScribbleNotes");
    db.get("allNotes", (err, doc) => {
      if (err) {
        var doc = {
          _id: "allNotes",
          notes: notesData,
        };
        return db.put(doc);
      } else {
        return db.put({
          _id: doc._id,
          notes: notesData,
          _rev: doc._rev,
        });
      }
    }).then(() => {
      db.get("allNotes", (err, doc) => {
        setNotes(doc.notes);
        setClone(doc.notes)
        // console.log(doc.notes, "doc.notes");
      });
    });
  };

  const addNotes = () => {
    const notesObjState = JSON.parse(JSON.stringify(notesObj));
    const notesData = _.cloneDeep(notes);
    // console.log(notesObjState,"SaveNotesdata")
    if (!(Object.keys(notesObjState).length)) {
      setOpenNoteModal(false);
      setNotesObj(null);
      return;
    }

    const editNoteIndex = notes.findIndex(
      (note) => note.id && note.id === notesObj.id
    );
    const isNewNote = editNoteIndex < 0;

    if (isNewNote) notesObjState.id = uuid();
    notesData.splice(
      isNewNote ? notes.length : editNoteIndex,
      isNewNote ? 0 : 1,
      notesObjState
    );
    
    saveNotes(notesData);

    setOpenNoteModal(false);
    setNotesObj(null);
  };

  const toggleLabelModal = (evt) => {
    setShowLabelModal((prevState) => !prevState);
    setSelectedLabel(notesObj?.label);
  };

  const handleChangeNewLabel = (evt) => {
    let searchedLabel = evt.target.value;
    let filterLabel = [];

    filterLabel = labels.filter(label => label?.name?.toLowerCase().includes(searchedLabel.toLowerCase()));
    setSearchedLabel(searchedLabel);
    setFilteredLabels(filterLabel);
  };

  const addNewLabel = (evt) => {
    if (evt.keyCode == 13) {
      if (filteredLabels?.length) return;

      const labelObj = {
        id: uuid(),
        name: searchedLabel,
      };

      const db = new PouchDB("ScribbleNotes");
      db.get("labels", (err, doc) => {
        if (err) {
          var doc = {
            _id: "labels",
            labels: [labelObj],
          };
          return db.put(doc);
        } else {
          return db.put({
            _id: doc._id,
            labels: [...doc.labels, labelObj],
            _rev: doc._rev,
          });
        }
      }).then(() => {
        db.get("labels", (err, doc) => {
          setLabels(doc.labels);
          setSearchedLabel("");
        });
      });
    }
  };

  const onChangeLabel = () => {
    const notesObjState = JSON.parse(JSON.stringify(notesObj));

    notesObjState.label = selectedLabel;

    setNotesObj(notesObjState);
  };

  const handleRemoveLabel = (index) => {
    return (evt) => {
      evt.stopPropagation();

      const labelsClone = _.cloneDeep(labels);
      labelsClone.splice(index, 1);

      const db = new PouchDB("ScribbleNotes");
      db.get("labels", (err, doc) => {
        if (err) {
          var doc = {
            _id: "labels",
            labels: labelsClone,
          };
          return db.put(doc);
        } else {
          return db.put({
            _id: doc._id,
            labels: labelsClone,
            _rev: doc._rev,
          });
        }
      }).then(() => {
        db.get("labels", (err, doc) => {
          setLabels(labelsClone);
        });
      });
    };
  };

  const onSelectLabel = (label) => {
    onToggleArchiveView(false);
    setSelectedFilterLabel(label);
  }

  const toggleDeleteModal = (evt, note = null) => {
    evt?.stopPropagation?.()
    setShowDeleteModal(prevState => !prevState);
    setSelectedNote(note);
  }

  const toggleColorModal = () => {
    setShowColorModal((prevState) => !prevState);
  };

  const onColorChange = (color) => {
    const notesObjState = JSON.parse(JSON.stringify(notesObj));

    notesObjState.color = color;
    setNotesObj(notesObjState);
  };

  const onToggleArchive = (notes) => {
    return (evt) =>{
       // const notesObjState = JSON.parse(JSON.stringify(notesObj));
    // notesObjState.archive = !notesObjState.archive;
    // setNotesObj(notesObjState);
        evt.stopPropagation();
        const { notesData, findEditNoteIndex } = useEditNoteVariable(notes);
  
        // notesObj.archive = !notesObj.archive;
        const notesObjState = JSON.parse(JSON.stringify(notesObj));
        notesObjState.archive = !notesObjState.archive;
  
        notesData.splice(findEditNoteIndex, 1,  notesObjState);
        setNotesObj(notesObjState);
        saveNotes(notesData);
        setOpenNoteModal(false);
       
    }
   
  };

  // const onToggleEditNoteArchive = (note) => {
  //   return (evt) => {
  //     evt.stopPropagation();
  //     const { noteObj, notesData, findEditNoteIndex } = useEditNoteVariable(note);

  //     noteObj.archive = !noteObj.archive;

  //     notesData.splice(findEditNoteIndex, 1, noteObj);
  //     saveNotes(notesData);
  //   }
  // }

  const handleTranslateLangauge = (key) => {
    return () => {
      setSelectedTranslateLang(key);
      if (notesObj?.content) translateContent(notesObj.content, Langauges[key]);
    }
  }

  const translateContent = (content = "", targetLangauge = "ta") => {
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLangauge}&dt=t&q=${encodeURIComponent(content)}`)
      .then(res => res.ok ? res.json() : res.text())
      .then((data) => {
        let translatedText = "";
        if (data && data[0] && data[0].length) {
          data[0].map(text => {
            translatedText = translatedText.concat(text[0])
          });

          setTranslatedContent(translatedText);
        }
      }).catch(err => {
        console.error("Err: -->", err);
      })

    toggleTranslateDropdown()
  }

  const useEditNoteVariable = (note) => {
    const noteObj = JSON.parse(JSON.stringify(note));
    const notesData = _.cloneDeep(notes);
    const findEditNoteIndex = notesData.findIndex(
      (note) => note.id && note.id === noteObj.id
    );


    return {
      noteObj,
      notesData,
      findEditNoteIndex
    }
  }

  const onTogglePin = (note) => {
    // console.log(note, "notenote");
    return (evt) => {
      evt.stopPropagation();
      const { noteObj, notesData, findEditNoteIndex } = useEditNoteVariable(note);

      noteObj.pinned = !noteObj.pinned;

      notesData.splice(findEditNoteIndex, 1, noteObj);

      saveNotes(notesData);
      setArchive(true)
    };
  };

  const onToggleEditNoteArchive = (note) => {
    return (evt) => {
      evt.stopPropagation();
      const { noteObj, notesData, findEditNoteIndex } = useEditNoteVariable(note);

      noteObj.archive = !noteObj.archive;

      notesData.splice(findEditNoteIndex, 1, noteObj);
      saveNotes(notesData);
    }
  }

  const onToggleEditColorModal = (evt, id = null) => {
    if (evt && evt.stopPropagation) evt.stopPropagation()
    setShowEditColorModal((prevState) =>
      (prevState !== id) ? id : null
    );
  }

  const onEditNoteColorChange = (note, color, evt) => {
    evt.stopPropagation();
    const { findEditNoteIndex, noteObj, notesData } = useEditNoteVariable(note)

    noteObj.color = color;

    notesData.splice(findEditNoteIndex, 1, noteObj);
    saveNotes(notesData);
  };

  const onDeleteNote = () => {
    const { findEditNoteIndex, notesData } = useEditNoteVariable(selectedNote);

    if (findEditNoteIndex >= 0) {
      notesData.splice(findEditNoteIndex, 1);
      saveNotes(notesData);
    }
    setSelectedNote(null);
    toggleDeleteModal()
  }

  useEffect(() => {
    const db = new PouchDB("ScribbleNotes");
    db.get("allNotes", (err, doc) => {
      if (err) {
        var doc = {
          _id: "allNotes",
          notes: [],
        };
        db.put(doc);
      } else {
        setNotes(doc.notes);
        setClone(doc.notes);
      }
    });
    db.get("labels", (err, doc) => {
      if (err) {
        var doc = {
          _id: "labels",
          labels: [],
        };
        db.put(doc);
      } else {
        setLabels(doc.labels);
      }
    });
  }, []);

  

  const handleSearch = (e) => {
    const { value, name } = e.target
      setSearched(value)
    // console.log(notes,"fff");
    // let searched = notes.filter((elmnt, id) => elmnt.title.toLowerCase()
    //                                            .includes(value.toLowerCase()))
    // if (value == "") {
    //   setNotes(clone)
    //   console.log(clone, "clone.....");
    // } else {
    //   setNotes(searched)
    //   // console.log(searched,"Searched")
    // }
    //  console.log(searched, "searchedsearched");
  }
  
  useEffect(() => {
    setLanguageList(Langauges)
    setLanguageStaticList(Langauges)
  }, []);

  function handleKeyDown(event, language) {
    // console.log(event,"-handleKeyDown-",language)
    if (event.key === 'Enter') {
        setSelectedTranslateLang(language);
      if (notesObj?.content) translateContent(notesObj.content, Langauges[language]);
    }
}

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en' }, 
      'google_translate_element'
    );
  };

  const onInputChange=(e)=>{
    let newLangList = {...langaugeStaticList}
    setSelectedTranslateLang(e.target.value)
  if(e.target.value !=''){
    const filteredLang = Object.keys(newLangList).map((lang)=>{
      if(lang.toLowerCase().includes(e.target.value.toLowerCase()))
      {
       return {[lang]:langaugeStaticList[lang]}
      }
      })
    let langObject =  Object.assign({}, ...filteredLang)
    setLanguageList(langObject)
  }else{
    setLanguageList(langaugeStaticList)
  }
  
  }
 
  const updateTranslation = () => {
    const translatedText = document.querySelector('.goog-te-banner-frame span span').innerText;
    setTranslatedContent(translatedText);
  };


     useOutsideAlerter(addNoteColorModalWrapperRef, showColorModal ? toggleColorModal : null);
     useOutsideAlerter(addNoteTranslateWrapperRef, showTranslationDropdown == 'Y' ? toggleTranslateDropdown : null);
     useOutsideAlerter(addEditNoteColorModalWrapperRef, showEditColorModal ? onToggleEditColorModal : null);

  const renderNotes = notes.filter( 
    (note) =>((selectedFilterLabel ? ((note.label?.id == selectedFilterLabel.id) && !note.archive) : (!!note.archive == showArchivedNotes) ) 
            && ((searched? (note.title.toLowerCase().includes(searched.toLowerCase())) : note)
    ))
    );

  const renderLabels = searchedLabel ? filteredLabels : labels
  const isPinnedNotePresent = !!renderNotes.filter((note) => note.pinned)
    .length;
  const isOtherNotePresent = !!renderNotes.filter((note) => !note.pinned)
    .length;

  const RenderNoteComponent = ({ note, index }) => (
    <div
      className={`relative flex flex-col h-[300px] min-w-[280px] max-w-[650px] p-[20px] border-2`}
      key={index}
      style={note?.color?.hex && note.color.hex.toLowerCase() !== "#ffffff" ? { backgroundColor: `${note?.color?.hex}66`, borderWidth: "0" } : {}}
      onClick={handleSelectNote(note)}
    >
      <div className=" text-[20px] font-[sfpro-bold] w-[95%] truncate">
        {note.title}
      </div>
      <div className="whitespace-pre-line font-[sfpro-regular] max-h-[170px] mb-[10px] scrollBar overflow-y-auto">
        {note.content}
      </div>
      <div className="mt-auto mb-[10px]">
        {note.label?.name ? (
          <div style={note.color?.hex ? { backgroundColor: note.color.hex } : null} className="bg-[rgba(0,0,0,0.25)] px-[20px] font-[sfpro-bold] py-[5px] whitespace-nowrap w-min">{note.label?.name}</div>
        ) : null}
      </div>
      <div className="flex ">
        <div className="relative">
          <RippleButton onClick={(evt) => onToggleEditColorModal(evt, note.id)} title="color">
            <BtImage alt={"color pallete"} src="/icons/palette_FILL0_wght400_GRAD0_opsz48.svg" width={"20px"} height={"20px"} />
          </RippleButton>
          {(showEditColorModal === note.id) ? (
            <div
              ref={addEditNoteColorModalWrapperRef}
              className="absolute p-[20px] bg-white border-[2px] rounded-[20px] bottom-[30px]"
            >
              <CircleColorPicker
                onChange={(color, evt) => onEditNoteColorChange(note, color, evt)}
                color={note.color}
              />
            </div>
          ) : null}
        </div>
        <RippleButton onClick={onToggleEditNoteArchive(note)} title={note?.archive ?"Unarchive" : "Archive"} >
          {note?.archive ? (
            <BtImage style={"opacity-[0.75]"} alt={"unarchive"} src="/icons/unarchive_icon.svg" width={"20px"} height={"20px"} />
          ) : (
            <BtImage style={"opacity-[0.75]"} alt={"archive"} src="/icons/archive_in_icon.svg" width={"20px"} height={"20px"} />
          )}
        </RippleButton>
        <RippleButton onClick={(evt) => toggleDeleteModal(evt, note)} title="Delete"><BtImage style={"opacity-[0.75]"} alt={"delete"} src="/icons/delete-outline.svg" width={"20px"} height={"20px"}
         /></RippleButton>
      </div>
      <div
        className={styles.fold_effect}
        style={note.color?.hex && note.color?.hex?.toLowerCase() !== "#ffffff" ? {
          borderColor: `${note.color?.hex} #F9F9F9`,
          bottom: "0",
          right: "0",
        } : {}}
      ></div>

      <RippleButton className="!absolute top-[10px] right-[10px]" onClick={onTogglePin(note)}>
        {note.pinned ? (
          <BtImage alt={"color pallete"} style={"opacity-[0.75]"} src="/icons/pin-black.svg" width={"20px"} height={"20px"} title="Color"/>
        ) : (
          <BtImage alt={"color pallete"} style={"opacity-[0.75]"} src="/icons/pin-outline.svg" width={"20px"} height={"20px"} title="Color"/>
        )}
      </RippleButton>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-[50px_auto] scrollBar h-screen bg-[#F9F9F9]">
        <div className="h-[inherit]">
          <div className="border-r-[1px] absolute w-[50px] h-full bg-white scrollBar overflow-x-hidden z-[1] transition-all duration-[350ms] hover:w-[200px]">
            <div className="border-b-[1px] h-[50px]">
              <div className={SIDEBAR_STATIC_W_H_CLASS}>
                <BtImage
                  src="/icons/menu_fill.svg"
                  height="20"
                  width="20"
                  alt="btLineLogo"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => { onToggleArchiveView(false); onSideBarView("home") }}
                className="flex w-[150px] items-center"
              >
                <div className={SIDEBAR_STATIC_W_H_CLASS}>
                  <BtImage
                    src={"/icons/sticky_note_2_FILL0_wght400_GRAD0_opsz48.svg"}
                    alt={"Home"}
                    width={"20"}
                    height={"20"}
                  />
                </div>
                <p className="ml-[1px]">Home</p>
              </button>
              {labels.map(label => (
                <button onClick={() => { onSelectLabel(label); onSideBarView(label.id) }} key={label.id} className="flex w-[150px] items-center">
                  <div className={SIDEBAR_STATIC_W_H_CLASS}>
                    <BtImage
                      src={"/icons/label_outline_icon.svg"}
                      alt={"Home"}
                      width={"20"}
                      height={"20"}
                    />
                  </div>
                  <p className="ml-[1px]">{label.name}</p>
                </button>
              ))}
              <button
                onClick={() => { onToggleArchiveView(true); onSideBarView("archive") }}
                className="flex w-[150px] items-center"
              >
                <div className={SIDEBAR_STATIC_W_H_CLASS}>
                  <BtImage
                    alt={"archive"}
                    src="/icons/archive_in_icon.svg"
                    width={"20px"}
                    height={"20px"}
                  />
                </div>
                <p className="ml-[1px]">Archive</p>
              </button>
            </div>
          </div>
        </div>
        <div className="h-[inherit] relative">
          <div className="border-b-[1px] flex flex-row items-end  h-[7vh] bg-white lg:items-center md:items-center">
            <BtoolsHeader
              Src="/icons/notesicon.svg"
              Height="25"
              Width="30"
              headerContainerStyles={{
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            />
            <h1 className="font-[SpaceGrotesk-bold] text-[18px] lg:text-[17px]">Scribble Notes</h1>
            <div className="hidden w-[60%]  items-center justify-center h-10 lg:flex md:flex">
              <div className="bg-[#F4F5FA] rounded-[5px] flex items-center h-8 w-[50%]">
                <Image src="/icons/layer1.svg" alt="" width="30" height="15" />
                <input onChange={handleSearch} className="w-full bg-[#F4F5FA] rounded-[5px] font-[sfpro-medium] outline-none h-8" type="text" placeholder="Search  from your notes"></input>
              </div>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-100px)] justify-center flex items-center flex-col gap-x-[15px] relative bg-white">
          
          {!openNoteModal ? 
             (<div className=" w-[100%] flex items-center justify-center h-10 lg:hidden md:hidden">
              <div className="bg-[#F4F5FA] rounded-[5px] flex items-center h-8 w-[60%]">
                <Image src="/icons/layer1.svg" alt="" width="30" height="15" />
                <input onChange={handleSearch} className="w-full bg-[#F4F5FA] rounded-[5px] font-[sfpro-medium] outline-none h-8" type="text" placeholder="Search from your notes"></input>
              </div>
            </div>) : null
          }
            
            {!openNoteModal && renderNotes?.length ? (
              <div className="h-[inherit] w-[inherit] px-[25px] py-[15px] scrollBar bg-white overflow-y-auto">
                {isPinnedNotePresent ? (
                  <div>
                    <h2 className="text-[20px] font-[sfpro-bold] uppercase mb-[20px]">
                      Pinned
                    </h2>
                    <div className="flex flex-wrap gap-[30px] pb-[20px]">
                      {renderNotes
                        .filter((note) => note.pinned
                      )
                        .map((note, index) => (
                          <RenderNoteComponent note={note} index={index}/>
                        ))}
                    </div>
                  </div>
                ) : null}
                {isOtherNotePresent ? (
                  <div className="pb-[35px]">
                    {/* {isPinnedNotePresent ? (
                      <h2 className="text-[20px] font-[sfpro-bold] uppercase mb-[20px]">
                        Others
                      </h2>
                    ) : null} */}
                    <h2 className="text-[20px] font-[sfpro-bold] uppercase mb-[20px]">
                      Others
                    </h2>
                    <div className="flex flex-wrap gap-[30px]">
                      {renderNotes
                        .filter((note) => !note.pinned)
                        .map((note, index) => (
                          <RenderNoteComponent note={note} index={index}/> 
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : !openNoteModal ? (
              <>
                <div className="flex flex-col items-center justify-center w-[inherit] h-[inherit] bg-white">
                  <BtImage src="/icons/notesicon.svg" width={"70"} height={"71"} />
                  {selectedSideBar == "home"
                    ?
                    <>
                      <h2 className="text-[#171717] text-[35px] font-[sfpro-bold] mt-[5px] text-center">Add your rough ideas & scribbles here</h2>
                      <p className="text-[#171717] text-BtImage[20px] font-[sfpro-regular] opacity-40 mt-[5px] text-center">Click on the add button to get started</p>
                    </>
                    :
                    <>
                      <h2 className="text-[#171717] text-[25px] font-bold mt-[5px] text-center">No {selectedSideBar === "archive" ? "Archived " : ""} Notes Found</h2>
                    </>
                  }
                </div>
              </>
            ) : null}
            {!openNoteModal && selectedSideBar === "home" && (
              <button
                onClick={onAddNewNote}
                className="absolute w-[45px] h-[45px] p-[10px] rounded-full bottom-[20px] right-[40px] bg-[#FABD42] flex items-center justify-center z-[100]"
              >
                <BtImage src={"/icons/add-white.svg"} width="20px" height="20px" />
              </button>
            )}
            {openNoteModal ? (
              <div
                className={`bg-white w-[80%] h-[80%] relative border-[2px]`}
                style={{
                        ...(notesObj?.color?.hex && notesObj.color.hex.toLowerCase() !== "#ffffff"
                          ? { backgroundColor: `${notesObj?.color?.hex}66`, borderWidth: 0 }
                          : {}),
                       
                        
                      }}
              >
                <div className="w-full h-full p-[20px] pb-[5px] flex flex-col ">
                  <div className="w-full h-full p-[20px] pb-[5px] flex flex-col" >
                  {/* <div>Title</div> */}
                  <input
                    name="title"
                    value={notesObj.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="mb-[15px] font-[sfpro-medium] bg-transparent hover:bg-slate-100 outline-none h-8"
                    disabled = {showArchivedNotes}
                  />
                  {/* <p>add your content here...</p> */}
                  <textarea
                    name="content"
                    value={notesObj.content}
                    onChange={handleChange}
                    className="h-[75px] font-[sfpro-regular] resize-none bg-transparent hover:bg-slate-100 outline-none"
                    placeholder="add your content here..."
                    disabled = {showArchivedNotes}
                  />

                  <div className="py-[20px]">
                  {/* <div id="google_translate_element">hi data</div>
                  <button  onClick={updateTranslation}>Translate</button> */}
                    {showTranslationDropdown ? (
                      <div ref={addNoteTranslateWrapperRef} className="relative inline-block text-left mb-[10px]" style={{ pointerEvents : showArchivedNotes ? "none" : "auto"}}>
                        <div>
                          {/* <input type="text" /> */}
                          <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            ref={addNoteTranslateWrapperRef}
                            onClick={toggleTranslateDropdown}
                            
                            style={{cursor:showArchivedNotes ? "not-allowed":"pointer"}}
                          >
                            {/* {selectedTranslateLang ? selectedTranslateLang :  */}
                            <input placeholder="Select Language" onFocus={onFocusChange} onClick={toggleTranslateDropdown} type="text" value={selectedTranslateLang}  onChange={onInputChange}  
                             disabled = {showArchivedNotes} class="outline-none"/>
                            {/* } */}
                            <svg
                              className="-mr-1 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>


                        {showTranslationDropdown == "Y" ? (
                          <div
                            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="0"
                          >
                            <div className="py-1 max-h-[190px] overflow-y-auto" role="none">
                              {Object.keys(langaugeList).length>0?Object.keys(langaugeList).map(langauge => (
                                <a
                                  onClick={handleTranslateLangauge(langauge)}
                                  className="text-gray-700 block px-4 py-2 text-sm transition-all hover:bg-[rgba(0,0,0,0.1)]"
                                  role="menuitem"
                                  tabIndex="0"
                                  id="menu-item-0"
                                  
                                  onChange={(e) => handleKeyDown(e,langauge)} 
                                >
                                
                                  {langauge}
                                </a>
                              )):<div className="text-center">No Data Found</div>}
                              
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <Button variant="contained" className="!normal-case !rounded-[0] !mb-[10px]" onClick={toggleTranslateDropdown} 
                      style={{cursor:showArchivedNotes ? "not-allowed":"pointer",pointerEvents:showArchivedNotes ? "none":"auto" }}>
                        Translate this note</Button>
                    )}

                    {/* <div className="flex items-center">
                      <p className="text-[14px]">Powered by</p>
                      <BtImage src={"/images/google-translate.png"} width={"140"} height={"20"} />
                    </div> */}


                  </div>

                  <div>
                    {showTranslationDropdown && translatedContent ? (
                      <p className="whitespace-pre-line max-h-[74px] overflow-y-auto hover:bg-slate-100 outline-none">
                        {translatedContent}
                      </p>
                    ) :
                      null}
                       {/* <p className="whitespace-pre-line max-h-[80px] overflow-y-auto hover:bg-slate-100 outline-none">
                        aa{translatedContent}
                      </p> */}

                  </div>

                  <div className="mt-auto mb-[15px] w-[98%] flex justify-between" style={{ pointerEvents : showArchivedNotes ? "none" : "auto"}}>
                    <button
                      style={notesObj.color?.hex ? { backgroundColor: notesObj.color.hex } : null}
                      className="bg-[rgba(0,0,0,0.25)] flex flex-row justify-between items-center font-[sfpro-bold] text-black px-[20px] py-[5px]"
                      onClick={toggleLabelModal}
                    >
                      <Image src="/icons/createplusBlack.svg" className="mr-4" height={12} width={12} />
                      {notesObj.label ? notesObj.label.name : "Add Label"}
                    </button>  
                    <button hidden={showArchivedNotes?true:false } style={{cursor:!notesObj.title? "not-allowed":"pointer"}} onClick={addNotes} disabled={!notesObj.title} 
                           className={`${!notesObj.title ?"bg-gray-300 text-black" :"bg-[#1565c0] text-white shadow-md"}  rounded-[5px] w-[25%] h-[5vh] lg:w-[18%] `}>Save</button>
                  </div>

                  {/* bg-[#1565c0] */}
                  <div className="flex gap-x-[10px]">
                    {/* <RippleButton>
                      <BtImage
                        alt={"remainder"}
                        src="/icons/add_alert_FILL0_wght400_GRAD0_opsz48.svg"
                        width={"20px"}
                        height={"20px"}
                      />
                    </RippleButton> */}
                    <div className="relative" ref={addNoteColorModalWrapperRef} style={{ pointerEvents : showArchivedNotes ? "none" : "auto"}}>
                      <RippleButton onClick={toggleColorModal} title="Color">
                        <BtImage
                          alt={"color pallete"}
                          src="/icons/palette_FILL0_wght400_GRAD0_opsz48.svg"
                          width={"20px"}
                          height={"20px"}
                        />
                      </RippleButton>
                      {showColorModal ? (
                        <div
                          className="absolute p-[20px] bg-white border-[2px] rounded-[20px] bottom-[30px]"
                        >
                          <CircleColorPicker
                            color={notesObj.color}
                            onChange={onColorChange}
                          />
                        </div>
                      ) : null}
                    </div>
                    <RippleButton onClick={onToggleArchive(notesObj)} title={notesObj?.archive?'Unarchive': "Archive"}>
                      {notesObj?.archive ? (
                        <BtImage
                          style={"opacity-[0.75]"}
                          alt={"unarchive"}
                          src="/icons/unarchive_icon.svg"
                          width={"20px"}
                          height={"20px"}
                        />
                      
                      ) : (
                        <BtImage
                          style={"opacity-[0.75]"}
                          alt={"archive"}
                          src="/icons/archive_in_icon.svg"
                          width={"20px"}
                          height={"20px"}
                        />
                      )}
                    </RippleButton>

                    {/* <RippleButton onClick={onToggleEditNoteArchive(note)}>
          {notesObj?.archive ? (
            <BtImage style={"opacity-[0.75]"} alt={"unarchive"} src="/icons/unarchive_icon.svg" width={"20px"} height={"20px"} />
          ) : (
            <BtImage style={"opacity-[0.75]"} alt={"archive"} src="/icons/archive_in_icon.svg" width={"20px"} height={"20px"} />
          )}
        </RippleButton> */}
                  </div>
                  {/* Archive area */}
                  {/* <RippleButton className="!absolute top-[13px] right-[40px]" >
                    {archive ? (
                      <BtImage alt={"color pallete"} style={"opacity-[0.75]"} src="/icons/pin-black.svg" width={"20px"} height={"20px"} />
                    ) : (
                      <BtImage alt={"color pallete"} style={"opacity-[0.75]"} src="/icons/pin-outline.svg" width={"20px"} height={"20px"} />
                    )}
                  </RippleButton> */}
                  </div>
                  <RippleButton
                    onClick={closeNotes}
                    className={`!absolute top-[10px] right-[10px] w-[40px] h-[40px] !p-0`}
                  >
                    <BtImage
                      alt={"close"}
                      src="/icons/icon-close.svg"
                      width={"30px"}
                      height={"30px"}
                    />
                  </RippleButton>
                </div>
                <div
                  className={styles.fold_effect}
                  style={notesObj.color?.hex && notesObj.color.hex.toLowerCase() !== "#ffffff" ? {
                    borderColor: `${notesObj.color.hex} #F9F9F9`,
                    bottom: "0",
                    right: "0"
                  } : {}}
                ></div>
              </div>
            ) : null}
          </div>
          <div className="relative h-[50px] as flex justify-end items-center gap-x-[30px] px-[20px] border-t-[1px]">
            <p className="absolute w-full text-left  font-[sfpro-medium] text-[6px] lg:text-[13px] lg:text-center md:text-center">© 2023, Alpha Business Solutions Pvt. Ldt. All Right Reserved</p>
            <a href="#" className="relative z-[1] text-[6px] font-[sfpro-medium] lg:text-[13px]">Privacy Policy</a>
            <a href="#" className="relative z-[1] text-[6px] font-[sfpro-medium] lg:text-[13px]">Terms & Conditions</a>
          </div>

        </div>
      </div>
      {showLabelModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              {/*Modal*/}
              <div className="border-0 rounded-lg shadow-lg w-[280px] relative flex flex-col  bg-white outline-none focus:outline-none lg:w-[480px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg text-white font-semibold font-[sf-pro-medium]">
                    Add Label
                  </h3>
                  <button
                    type="button"
                    onClick={toggleLabelModal}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                    text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/*content */}
                <div className="px-5 pb-[15px]">
                  <input
                    onChange={handleChangeNewLabel}
                    onKeyDown={addNewLabel}
                    className="bg-[#F4F5FA] w-full h-[40px] px-[15px] "
                    placeholder="Enter Label Name"
                    value={searchedLabel}
                  />
                </div>
                <div className="px-5 max-h-[150px] scrollBar overflow-y-auto">
                  {renderLabels?.length ?
                    renderLabels?.map((label, index) => (
                      <div
                        className="flex items-center py-[5px]"
                        onClick={() => { setSelectedLabel(label) }}
                      >
                        {selectedLabel?.id === label.id ? (
                          <BtImage
                            src={"/icons/label.svg"}
                            width={"20px"}
                            height={"20px"}
                          />
                        ) : (
                          <BtImage
                            src={"/icons/label_outline_icon.svg"}
                            width={"20px"}
                            height={"20px"}
                          />
                        )}
                        <p className="ml-[10px] font-[sfpro-regular] cursor-pointer">{label.name}</p>
                        <button
                          className="ml-auto"
                          onClick={handleRemoveLabel(index)}
                        >
                          <BtImage
                            src={"/icons/delete-outline.svg"}
                            width={"20px"}
                            height={"20px"}
                          />
                        </button>
                      </div>
                    )) :
                    <p className="text-center py-[10px]">
                      No Label found. Press Enter to add Searched Label
                    </p>
                  }
                </div>
                <div className="p-5 flex">
                  <button onClick={() => { onChangeLabel(); toggleLabelModal() }} className="ml-auto w-[175px] h-[55px] bg-[#FABD42] rounded-[5px]">
                    Confirm
                  </button>
                </div>
                <div> </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showDeleteModal ?
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              {/*Modal*/}
              <div className="border-0 rounded-lg shadow-lg w-[280px] relative flex flex-col  bg-white outline-none focus:outline-none lg:w-[480px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-semibold font-[sf-pro-medium]">
                    Delete Note
                  </h3>

                  <button
                    type="button"
                    onClick={toggleDeleteModal}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                      text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/*content */}
                <div className="px-5 pb-[15px]">
                  <p className="opacity-40 font-[sfpro-regular] text-black">Are you sure you want to permanently delete this note?</p>
                </div>
                <div className="p-5 flex">
                  <button className="ml-auto w-[175px] h-[55px] rounded-[5px]" onClick={toggleDeleteModal}>
                    Cancel
                  </button>
                  <button className="ml-[5px] w-[175px] h-[55px] bg-[#EF5350] rounded-[5px] text-white" onClick={onDeleteNote}>
                    Confirm
                  </button>
                </div>
                <div> </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        : null}
    </>
  );
};
export default ScribbleNotes;