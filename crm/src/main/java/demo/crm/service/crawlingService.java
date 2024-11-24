package demo.crm.service;


import demo.crm.entity.Startup;
import demo.crm.repository.StartupRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class crawlingService {

    @Autowired
    private StartupRepository startupRepository;

    public void crawlAndSave() {
        try {
            String url = "https://thevc.kr/browse/startups";
            Document doc = Jsoup.connect(url).get();

            // 데이터가 테이블에 있을 것으로 예상하고, 테이블의 모든 행을 선택
            Elements rows = doc.select("table tbody tr"); // 테이블 행 선택

            // 각 행에서 데이터를 추출하여 저장
            for (Element row : rows) {
                // 각 열(td) 선택
                Elements cols = row.select("td");

                Startup startup = new Startup();

                startup.setName(cols.get(1).select(".mb-4").text());
                startup.setProductOrService(cols.get(9).select(".mb-4").text());
                startup.setTechnology(cols.get(10).select(".chip-text").text());
                startup.setCategory(cols.get(11).select(".chip-text").text());

                //총 자본금 처리
                Element totalCapitalElement = cols.get(15).selectFirst(".mb-4");
                if(totalCapitalElement != null) {
                    Element removableElement = totalCapitalElement.selectFirst(".ml-4.text-sub.text-12");
                    if(removableElement != null) {
                        removableElement.remove();
                    }
                }
                startup.setTotalCapital(totalCapitalElement.text().trim());

                startup.setTotalInvestment(cols.get(18).text());
                startup.setRecentInvestment(cols.get(19).select(".chip-text").text());
                startup.setRecentFunding(cols.get(20).text());
                startup.setKeyInvestors(cols.get(21).select(".text-underline").text());
                //데이터베이스에 저장
                startupRepository.save(startup);
                }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
