export const getColumnDefinitions = (company, show) => {
  if (company === "startups") {
    if (show === "all") {
      return [
        {
          headerName: "기업명",
          field: "name",
          onCellClicked: (params) => {
            params.api.gridOptionsWrapper.gridOptions.context.navigate(
              `/startups/${params.data.id}`
            );
          },
        },
        { headerName: "주요 카테고리", field: "keyCategory" },
        { headerName: "총 투자금", field: "totalInvestment" },
        { headerName: "총 건수", field: "totalCount" },
        { headerName: "평균 투자 금액", field: "averageInvestment" },
        { headerName: "최근 펀딩 일자", field: "recentFunding" },
      ].context;
    } else if (show === "top") {
      return [
        {
          headerName: "기업명",
          field: "name",
          onCellClicked: (params) => {
            params.api.gridOptionsWrapper.gridOptions.context.navigate(
              `/startups/${params.data.id}`
            );
          },
        },
        { headerName: "주요 카테고리", field: "keyCategory" },
        { headerName: "총 투자금", field: "totalInvestment" },
        { headerName: "총 건수", field: "totalCount" },
      ];
    }
  } else if (company === "investors") {
    if (show === "all") {
      return [
        {
          headerName: "투자자명",
          field: "name",
          onCellClicked: (params) => {
            params.api.gridOptionsWrapper.gridOptions.context.navigate(
              `/investors/${params.data.id}`
            );
          },
        },
        { headerName: "제품/서비스", field: "productOrService" },
        { headerName: "기술 분야", field: "technology" },
        { headerName: "카테고리", field: "category" },
        { headerName: "총 자본금", field: "totalCapital" },
        { headerName: "총 투자금", field: "totalInvestment" },
        { headerName: "최근 투자 단계", field: "recentInvestment" },
        { headerName: "최근 펀딩 일자", field: "recentFunding" },
        { headerName: "주요 투자자", field: "keyInvestors" },
        { headerName: "선호도", field: "interest" },
      ];
    } else if (show === "top") {
      return [
        {
          headerName: "투자자명",
          field: "name",
          onCellClicked: (params) => {
            params.api.gridOptionsWrapper.gridOptions.context.navigate(
              `/investors/${params.data.id}`
            );
          },
        },
        { headerName: "카테고리", field: "category" },
        { headerName: "총 투자금", field: "totalInvestment" },
        { headerName: "최근 펀딩 일자", field: "recentFunding" },
      ];
    }
  } else {
    return [];
  }
};

export const getDefaultColDef = (company) => {
  if (company === "startups") {
    return {
      flex: 1,
      minWidth: 120,
      editable: false,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
      suppressHeaderContextMenu: true,  // 오류 수정된 속성 사용
    };
  } else if (company === "investors") {
    return {
      flex: 1,
      minWidth: 100,
      editable: false,
      filter: "agNumberColumnFilter",
      resizable: true,
      sortable: true,
    };
  } else {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
    };
  }
};
