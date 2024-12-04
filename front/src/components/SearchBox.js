import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { getInvestors, getStartups } from "../api/api";
import { CompanyDetailModal } from "../pages/Company/CompanyDetail";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [startups, setStartups] = React.useState([]);
  const [investors, setInvestors] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState(null);

  const handleModalOpen = (company) => {
    setSelectedCompany(company);
    setOpenModal(true); // 모달 열기
  };

  const handleModalClose = () => setOpenModal(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const investorsData = await getInvestors();
        const startupsData = await getStartups();
        setInvestors(investorsData);
        setStartups(startupsData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // startups와 investors를 합친 options 배열 생성
  const options = React.useMemo(() => {
    return [...startups, ...investors].map((item) => ({
      name: item.name,
      id: item.id,
    }));
  }, [startups, investors]);

  const handleClose = () => {
    setDialogValue({
      name: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            if (newValue) {
              const selectedCompany = options.find(
                (company) => company.name === newValue.name
              );
              handleModalOpen(selectedCompany); // 회사가 선택되었을 때 모달 열기
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `추가 "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={options}
        getOptionLabel={(option) => {
          // for example value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        sx={{ width: 300, height: 40 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="회사 또는 투자자 검색" size="small" />
        )}
      />
      {selectedCompany && (
        <CompanyDetailModal
          type="startups"
          openModal={openModal}
          handleClose={handleModalClose}
          company={selectedCompany}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              목록에 없는 회사를 추가해주세요!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="회사 이름"
              type="text"
              variant="standard"
            />
            {/* <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value,
                })
              }
              label="유형"
              type="number"
              variant="standard"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button type="submit">추가</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const startups = [
  {
    id: 1,
    name: "에코벤처스",
    category: "벤처캐피탈",
  },
  {
    id: 2,
    name: "넥스트이노베이션",
    category: "벤처캐피탈",
  },
  {
    id: 3,
    name: "코스모스펀드",
    category: "기업벤처캐피탈",
  },
  // ... more startups
];

const investors = [
  {
    id: 1,
    name: "엔파티클",
    productOrService: "미세입자 CDMO",
    technology: "연구개발",
  },
  {
    id: 2,
    name: "리피드",
    productOrService: "리피드",
    technology: "연구개발",
  },
  {
    id: 3,
    name: "텔레픽스",
    productOrService: "블루본",
    technology: "제조",
  },
  // ... more investors
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   {
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     title: "Star Wars: Episode V - The Empire Strikes Back",
//     year: 1980,
//   },
//   { title: "Forrest Gump", year: 1994 },
//   { title: "Inception", year: 2010 },
//   {
//     title: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: "Goodfellas", year: 1990 },
//   { title: "The Matrix", year: 1999 },
//   { title: "Seven Samurai", year: 1954 },
//   {
//     title: "Star Wars: Episode IV - A New Hope",
//     year: 1977,
//   },
//   { title: "City of God", year: 2002 },
//   { title: "Se7en", year: 1995 },
//   { title: "The Silence of the Lambs", year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: "Life Is Beautiful", year: 1997 },
//   { title: "The Usual Suspects", year: 1995 },
//   { title: "Léon: The Professional", year: 1994 },
//   { title: "Spirited Away", year: 2001 },
//   { title: "Saving Private Ryan", year: 1998 },
//   { title: "Once Upon a Time in the West", year: 1968 },
//   { title: "American History X", year: 1998 },
//   { title: "Interstellar", year: 2014 },
//   { title: "Casablanca", year: 1942 },
//   { title: "City Lights", year: 1931 },
//   { title: "Psycho", year: 1960 },
//   { title: "The Green Mile", year: 1999 },
//   { title: "The Intouchables", year: 2011 },
//   { title: "Modern Times", year: 1936 },
//   { title: "Raiders of the Lost Ark", year: 1981 },
//   { title: "Rear Window", year: 1954 },
//   { title: "The Pianist", year: 2002 },
//   { title: "The Departed", year: 2006 },
//   { title: "Terminator 2: Judgment Day", year: 1991 },
//   { title: "Back to the Future", year: 1985 },
//   { title: "Whiplash", year: 2014 },
//   { title: "Gladiator", year: 2000 },
//   { title: "Memento", year: 2000 },
//   { title: "The Prestige", year: 2006 },
//   { title: "The Lion King", year: 1994 },
//   { title: "Apocalypse Now", year: 1979 },
//   { title: "Alien", year: 1979 },
//   { title: "Sunset Boulevard", year: 1950 },
//   {
//     title:
//       "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964,
//   },
//   { title: "The Great Dictator", year: 1940 },
//   { title: "Cinema Paradiso", year: 1988 },
//   { title: "The Lives of Others", year: 2006 },
//   { title: "Grave of the Fireflies", year: 1988 },
//   { title: "Paths of Glory", year: 1957 },
//   { title: "Django Unchained", year: 2012 },
//   { title: "The Shining", year: 1980 },
//   { title: "WALL·E", year: 2008 },
//   { title: "American Beauty", year: 1999 },
//   { title: "The Dark Knight Rises", year: 2012 },
//   { title: "Princess Mononoke", year: 1997 },
//   { title: "Aliens", year: 1986 },
//   { title: "Oldboy", year: 2003 },
//   { title: "Once Upon a Time in America", year: 1984 },
//   { title: "Witness for the Prosecution", year: 1957 },
//   { title: "Das Boot", year: 1981 },
//   { title: "Citizen Kane", year: 1941 },
//   { title: "North by Northwest", year: 1959 },
//   { title: "Vertigo", year: 1958 },
//   {
//     title: "Star Wars: Episode VI - Return of the Jedi",
//     year: 1983,
//   },
//   { title: "Reservoir Dogs", year: 1992 },
//   { title: "Braveheart", year: 1995 },
//   { title: "M", year: 1931 },
//   { title: "Requiem for a Dream", year: 2000 },
//   { title: "Amélie", year: 2001 },
//   { title: "A Clockwork Orange", year: 1971 },
//   { title: "Like Stars on Earth", year: 2007 },
//   { title: "Taxi Driver", year: 1976 },
//   { title: "Lawrence of Arabia", year: 1962 },
//   { title: "Double Indemnity", year: 1944 },
//   {
//     title: "Eternal Sunshine of the Spotless Mind",
//     year: 2004,
//   },
//   { title: "Amadeus", year: 1984 },
//   { title: "To Kill a Mockingbird", year: 1962 },
//   { title: "Toy Story 3", year: 2010 },
//   { title: "Logan", year: 2017 },
//   { title: "Full Metal Jacket", year: 1987 },
//   { title: "Dangal", year: 2016 },
//   { title: "The Sting", year: 1973 },
//   { title: "2001: A Space Odyssey", year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: "Toy Story", year: 1995 },
//   { title: "Bicycle Thieves", year: 1948 },
//   { title: "The Kid", year: 1921 },
//   { title: "Inglourious Basterds", year: 2009 },
//   { title: "Snatch", year: 2000 },
//   { title: "3 Idiots", year: 2009 },
//   { title: "Monty Python and the Holy Grail", year: 1975 },
// ];
