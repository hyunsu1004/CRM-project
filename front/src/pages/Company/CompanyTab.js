import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CompanyGrid = ({ data, title }) => {
    const [columnDefs] = useState([
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Category', field: 'category', sortable: true, filter: true },
        { headerName: 'Total Count', field: 'totalCount', sortable: true, filter: true },
        { headerName: 'Total Investment', field: 'totalInvestment', sortable: true, filter: true },
        { headerName: 'Average Investment', field: 'averageInvestment', sortable: true, filter: true },
        { headerName: 'Recent Funding', field: 'recentFunding', sortable: true, filter: true },
        { headerName: 'Key Category', field: 'keyCategory', sortable: true, filter: true },
    ]);

    return (
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </Paper>
    );
};

const CompanyTabs = ({ startups, investors }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Company Tabs">
                <Tab label="Startups" />
                <Tab label="Investors" />
            </Tabs>
            <Box sx={{ marginTop: 3 }}>
                {tabIndex === 0 && <CompanyGrid data={startups} title="Startups List" />}
                {tabIndex === 1 && <CompanyGrid data={investors} title="Investors List" />}
            </Box>
        </Box>
    );
};

const CompanyDashboard = ({ startups, investors }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Company Dashboard
            </Typography>
            <CompanyTabs startups={startups} investors={investors} />
        </Box>
    );
};

export default CompanyDashboard;

// 예시 데이터를 사용하여 App 컴포넌트에서 CompanyDashboard를 호출할 수 있습니다.
// 아래와 같은 형태로 사용 가능합니다.

/*
import React from 'react';
import CompanyDashboard from './CompanyDashboard';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <CompanyDashboard startups={data.startups} investors={data.investors} />
    </div>
  );
}

export default App;
*/

// data.json 파일의 데이터는 질문에 주신 데이터를 그대로 사용하시면 됩니다.