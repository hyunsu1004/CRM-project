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
    const [type, setType] = React.useState(null);

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
                            // const selectedCompany = options.find(
                            //   (company) => company.name === newValue.name
                            // );
                            const selectedCompany = startups.find(
                                (company) => company.name === newValue.name
                            );
                            if (selectedCompany) {
                                setType("startups");
                                handleModalOpen(selectedCompany); // 회사가 선택되었을 때 모달 열기
                            } else {
                                const selectedCompany = investors.find(
                                    (company) => company.name === newValue.name
                                );
                                if (selectedCompany) {
                                    setType("investors");
                                    handleModalOpen(selectedCompany); // 회사가 선택되었을 때 모달 열기
                                }
                            }
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
                    type={type}
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
        totalCount: "128건",
        totalInvestment: "3500억원",
        averageInvestment: "2억 ~ 50억원",
        recentFunding: "2024-11-25",
        keyCategory: "지속가능성 환경",
    },
    {
        id: 2,
        name: "넥스트이노베이션",
        category: "벤처캐피탈",
        totalCount: "72건",
        totalInvestment: "920억원",
        averageInvestment: "5억 ~ 20억원",
        recentFunding: "2024-11-24",
        keyCategory: "클라우드 인공지능",
    },
    {
        id: 3,
        name: "코스모스펀드",
        category: "기업벤처캐피탈",
        totalCount: "240건",
        totalInvestment: "1조 2000억원",
        averageInvestment: "10억 ~ 100억원",
        recentFunding: "2024-11-23",
        keyCategory: "제조업 스마트기기",
    },
    {
        id: 4,
        name: "다이나믹스파트너스",
        category: "액셀러레이터",
        totalCount: "65건",
        totalInvestment: "350억원",
        averageInvestment: "1억 ~ 20억원",
        recentFunding: "2024-11-22",
        keyCategory: "핀테크 블록체인",
    },
    {
        id: 5,
        name: "레볼루션인베스트",
        category: "벤처캐피탈",
        totalCount: "90건",
        totalInvestment: "1500억원",
        averageInvestment: "5억 ~ 40억원",
        recentFunding: "2024-11-21",
        keyCategory: "헬스케어 의료기기",
    },
    {
        id: 6,
        name: "라이프사이클파트너스",
        category: "기업벤처캐피탈",
        totalCount: "38건",
        totalInvestment: "400억원",
        averageInvestment: "3억 ~ 30억원",
        recentFunding: "2024-11-20",
        keyCategory: "소셜미디어 AI",
    },
    {
        id: 7,
        name: "피지오메틱스",
        category: "벤처캐피탈",
        totalCount: "115건",
        totalInvestment: "2200억원",
        averageInvestment: "10억 ~ 100억원",
        recentFunding: "2024-11-19",
        keyCategory: "바이오 헬스케어",
    },
    {
        id: 8,
        name: "리딩테크",
        category: "벤처캐피탈",
        totalCount: "130건",
        totalInvestment: "3000억원",
        averageInvestment: "15억 ~ 70억원",
        recentFunding: "2024-11-18",
        keyCategory: "기술 스타트업 AI",
    },
    {
        id: 9,
        name: "디지털브레인",
        category: "액셀러레이터",
        totalCount: "80건",
        totalInvestment: "1200억원",
        averageInvestment: "3억 ~ 25억원",
        recentFunding: "2024-11-17",
        keyCategory: "스마트시티 클라우드",
    },
    {
        id: 10,
        name: "알파벤처스",
        category: "벤처캐피탈",
        totalCount: "150건",
        totalInvestment: "6000억원",
        averageInvestment: "20억 ~ 100억원",
        recentFunding: "2024-11-16",
        keyCategory: "AI 블록체인",
    },
    {
        id: 11,
        name: "모던인베스트",
        category: "기업벤처캐피탈",
        totalCount: "57건",
        totalInvestment: "1200억원",
        averageInvestment: "10억 ~ 40억원",
        recentFunding: "2024-11-15",
        keyCategory: "리테일 핀테크",
    },
    {
        id: 12,
        name: "스마트포럼",
        category: "액셀러레이터",
        totalCount: "45건",
        totalInvestment: "800억원",
        averageInvestment: "2억 ~ 30억원",
        recentFunding: "2024-11-14",
        keyCategory: "스마트홈 IoT",
    },
    {
        id: 13,
        name: "미래투자",
        category: "벤처캐피탈",
        totalCount: "110건",
        totalInvestment: "3500억원",
        averageInvestment: "7억 ~ 80억원",
        recentFunding: "2024-11-13",
        keyCategory: "모바일 헬스케어",
    },
    {
        id: 14,
        name: "인사이트파트너스",
        category: "벤처캐피탈",
        totalCount: "125건",
        totalInvestment: "4900억원",
        averageInvestment: "15억 ~ 60억원",
        recentFunding: "2024-11-12",
        keyCategory: "핀테크 클라우드",
    },
    {
        id: 15,
        name: "넥스트레벨",
        category: "벤처캐피탈",
        totalCount: "140건",
        totalInvestment: "2200억원",
        averageInvestment: "5억 ~ 30억원",
        recentFunding: "2024-11-11",
        keyCategory: "헬스케어 바이오",
    },
    {
        id: 16,
        name: "씨앗인베스트",
        category: "엔젤투자",
        totalCount: "62건",
        totalInvestment: "150억원",
        averageInvestment: "1억 ~ 15억원",
        recentFunding: "2024-11-10",
        keyCategory: "스타트업 소셜미디어",
    },
    {
        id: 17,
        name: "시그마파운드",
        category: "기업벤처캐피탈",
        totalCount: "95건",
        totalInvestment: "1750억원",
        averageInvestment: "3억 ~ 25억원",
        recentFunding: "2024-11-09",
        keyCategory: "로보틱스 스마트기기",
    },
    {
        id: 18,
        name: "아이디어네스트",
        category: "벤처캐피탈",
        totalCount: "77건",
        totalInvestment: "850억원",
        averageInvestment: "2억 ~ 18억원",
        recentFunding: "2024-11-08",
        keyCategory: "AI 머신러닝",
    },
    {
        id: 19,
        name: "테크비전",
        category: "액셀러레이터",
        totalCount: "56건",
        totalInvestment: "680억원",
        averageInvestment: "1억 ~ 8억원",
        recentFunding: "2024-11-07",
        keyCategory: "클라우드 스마트시티",
    },
    {
        id: 20,
        name: "인포미디어",
        category: "벤처캐피탈",
        totalCount: "220건",
        totalInvestment: "5000억원",
        averageInvestment: "20억 ~ 90억원",
        recentFunding: "2024-11-06",
        keyCategory: "미디어 콘텐츠 VR",
    },
];
const investors = [
    {
        id: 1,
        name: "엔파티클",
        productOrService: "미세입자 CDMO",
        technology: "연구개발",
        category: "바이오/의료 아웃소싱",
        totalCapital: "9117만원",
        totalInvestment: "55억원",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "카이트창업가재단 팁스 큐러블",
        interest: false,
    },
    {
        id: 2,
        name: "리피드",
        productOrService: "리피드",
        technology: "연구개발",
        category: "환경/에너지 폐기물/쓰레기",
        totalCapital: "130만원",
        totalInvestment: "18억원",
        recentInvestment: "Pre-A",
        recentFunding: "2024-11-25",
        keyInvestors: "앤틀러코리아 더벤처스 더인벤션랩",
        interest: false,
    },
    {
        id: 3,
        name: "텔레픽스",
        productOrService: "블루본",
        technology: "제조",
        category: "우주/항공 기계",
        totalCapital: "19억원",
        totalInvestment: "174억원",
        recentInvestment: "Series B",
        recentFunding: "2024-11-25",
        keyInvestors: "유경피에스지자산운용 큐더스벤처스 인터베스트",
        interest: false,
    },
    {
        id: 4,
        name: "밸런스히어로",
        productOrService: "트루밸런스",
        technology: "결제",
        category: "금융 송금/결제",
        totalCapital: "18억원",
        totalInvestment: "1318억원",
        recentInvestment: "Pre-IPO",
        recentFunding: "2024-11-25",
        keyInvestors: "에스비브이에이 제이비인베스트먼트 본엔젤스벤처파트너스",
        interest: false,
    },
    {
        id: 5,
        name: "메이사",
        productOrService: "메이사",
        technology: "항공/드론",
        category: "건설/교통 모니터링",
        totalCapital: "6783만원",
        totalInvestment: "222억원",
        recentInvestment: "Series C",
        recentFunding: "2024-11-25",
        keyInvestors: "스틱벤처스 에이벤처스 한국항공우주산업",
        interest: false,
    },
    {
        id: 6,
        name: "에이아이스페라",
        productOrService: "크리미널 IP",
        technology: "통신/보안",
        category: "보안 모니터링",
        totalCapital: "5억원",
        totalInvestment: "200억원",
        recentInvestment: "Series B",
        recentFunding: "2024-11-25",
        keyInvestors: "엔에이치엔 넷마블 케이비인베스트먼트",
        interest: false,
    },
    {
        id: 7,
        name: "너바나나",
        productOrService: "ZETA",
        technology: "게임개발",
        category: "게임 AoS게임",
        totalCapital: "176만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "알토스벤처스 스마일게이트인베스트먼트 에이치알지",
        interest: false,
    },
    {
        id: 8,
        name: "아몬드컴퍼니",
        productOrService: "헬로라이브",
        technology: "음악/영상스트리밍",
        category: "엔터테인먼트 연예인",
        totalCapital: "23억원",
        totalInvestment: "150억원",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "지메이코리아 팁스 서울대학교기술지주",
        interest: false,
    },
    {
        id: 9,
        name: "제로원",
        productOrService: "사업장용 식품 폐기물 고속 감량기",
        technology: "제조",
        category: "환경/에너지 폐기물/쓰레기",
        totalCapital: "5000만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Seed",
        recentFunding: "2024-11-22",
        keyInvestors: "블루포인트파트너스",
        interest: false,
    },
    {
        id: 10,
        name: "케밍컴퍼니",
        productOrService: "케밍 시스템",
        technology: "클라우드",
        category: "헬스케어 헬스/다이어트",
        totalCapital: "1121만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Pre-A",
        recentFunding: "2024-11-22",
        keyInvestors: "클러스트벤처스 그리고컴퍼니",
        interest: false,
    },
    {
        id: 11,
        name: "클러쉬",
        productOrService: "클러쉬 쿠베",
        technology: "연구개발",
        category: "바이오/의료 아웃소싱",
        totalCapital: "9117만원",
        totalInvestment: "55억원",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "카이트창업가재단 팁스 큐러블",
        interest: false,
    },
    {
        id: 12,
        name: "구루컴퍼니",
        productOrService: "구루랑",
        technology: "연구개발",
        category: "환경/에너지 폐기물/쓰레기",
        totalCapital: "130만원",
        totalInvestment: "18억원",
        recentInvestment: "Pre-A",
        recentFunding: "2024-11-25",
        keyInvestors: "앤틀러코리아 더벤처스 더인벤션랩",
        interest: false,
    },
    {
        id: 13,
        name: "맵스젠",
        productOrService: "인간장기모사칩",
        technology: "제조",
        category: "우주/항공 기계",
        totalCapital: "19억원",
        totalInvestment: "174억원",
        recentInvestment: "Series B",
        recentFunding: "2024-11-25",
        keyInvestors: "유경피에스지자산운용 큐더스벤처스 인터베스트",
        interest: false,
    },
    {
        id: 14,
        name: "잇피",
        productOrService: "링닥",
        technology: "결제",
        category: "금융 송금/결제",
        totalCapital: "18억원",
        totalInvestment: "1318억원",
        recentInvestment: "Pre-IPO",
        recentFunding: "2024-11-25",
        keyInvestors: "에스비브이에이 제이비인베스트먼트 본엔젤스벤처파트너스",
        interest: false,
    },
    {
        id: 15,
        name: "런드리유",
        productOrService: "메이사",
        technology: "항공/드론",
        category: "건설/교통 모니터링",
        totalCapital: "6783만원",
        totalInvestment: "222억원",
        recentInvestment: "Series C",
        recentFunding: "2024-11-25",
        keyInvestors: "스틱벤처스 에이벤처스 한국항공우주산업",
        interest: false,
    },
    {
        id: 16,
        name: "세라믹/금속패키징서비스",
        productOrService: "크리미널 IP",
        technology: "통신/보안",
        category: "보안 모니터링",
        totalCapital: "5억원",
        totalInvestment: "200억원",
        recentInvestment: "Series B",
        recentFunding: "2024-11-25",
        keyInvestors: "엔에이치엔 넷마블 케이비인베스트먼트",
        interest: false,
    },
    {
        id: 17,
        name: "CXL 솔루션",
        productOrService: "ZETA",
        technology: "게임개발",
        category: "게임 AoS게임",
        totalCapital: "176만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "알토스벤처스 스마일게이트인베스트먼트 에이치알지",
        interest: false,
    },
    {
        id: 18,
        name: "아젠스 그래프",
        productOrService: "헬로라이브",
        technology: "음악/영상스트리밍",
        category: "엔터테인먼트 연예인",
        totalCapital: "23억원",
        totalInvestment: "150억원",
        recentInvestment: "Series A",
        recentFunding: "2024-11-25",
        keyInvestors: "지메이코리아 팁스 서울대학교기술지주",
        interest: false,
    },
    {
        id: 19,
        name: "큐토프",
        productOrService: "탄소 및 산소 동위원소 분리 솔루션",
        technology: "제조",
        category: "환경/에너지 폐기물/쓰레기",
        totalCapital: "5000만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Seed",
        recentFunding: "2024-11-22",
        keyInvestors: "블루포인트파트너스",
        interest: false,
    },
    {
        id: 20,
        name: "덴티플",
        productOrService: "치과용 임플란트",
        technology: "클라우드",
        category: "헬스케어 헬스/다이어트",
        totalCapital: "1121만원",
        totalInvestment: "알 수 없음",
        recentInvestment: "Pre-A",
        recentFunding: "2024-11-22",
        keyInvestors: "클러스트벤처스 그리고컴퍼니",
        interest: false,
    },
];