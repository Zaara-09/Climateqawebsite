import { useState } from 'react';
import { FileText, Download, ExternalLink, Copy, Check } from 'lucide-react';

export function ResearchPaper() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCitation = (citation: string, index: number) => {
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);

      // Select and copy the text
      textarea.select();
      textarea.setSelectionRange(0, citation.length);

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (successful) {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const paperContent = {
    title: "Ecological Analysis of PM2.5 exposure on Heart Disease mortality on a county level from 2020-2025 in Massachusetts",
    authors: "Fatema Zaara Shaikh",
    date: "January 25, 2026",
    abstract: `This study explored whether a detectable association exists between annual average PM2.5 levels and heart disease mortality rates at the county level in Massachusetts using publicly available data from 2018 to 2022. Researchers merged air quality data from the U.S. Environmental Protection Agency with county-level mortality rates from public health sources. Exploratory visualizations included trend lines and interactive geographic maps created with Plotly Express and Folium. Statistical analyses involved Pearson and Spearman correlations by year, along with ordinary least squares regression controlling for year effects. Results showed consistently weak correlations (|r| < 0.25) with high p-values and a regression model explaining less than 1% of variation in mortality (R² ≈ 0.009). No evidence of a short-term association emerged, likely due to limited PM2.5 variability in this relatively clean-air state, ecological design limitations, and unmeasured confounding factors. Rather than challenging established causal evidence from larger studies, this analysis evaluates the detectability of known environmental health relationships using short-term, aggregated public datasets. These findings highlight challenges in detecting subtle effects with such data and underscore the need for longer time series or individual-level studies.`,
    sections: [
      {
        title: "Introduction",
        content: `Interest in the link between air quality and public health started with a broader goal of building an AI tool to highlight climate change impacts through disease patterns. The focus narrowed to Massachusetts and heart disease mortality, a leading cause of death nationally. Fine particulate matter (PM2.5) was selected as the key pollutant, given extensive prior research connecting long-term exposure to elevated cardiovascular risks like heart attacks and strokes.

This project shifted toward examining a more specific methodological question: Can publicly available, county-level data in a state with generally good air quality reveal detectable associations between PM2.5 exposure and heart disease mortality over a short time frame (2018–2022)? Unlike biomedical studies establishing causality through controlled cohorts, this ecological analysis tests the feasibility of such links using aggregated records. Established literature from large-scale studies shows chronic PM2.5 exposure raises cardiovascular risks, but effects are often small and require careful adjustment for other influences. This work illustrates how data constraints at the state level can affect conclusions drawn from public sources.`
      },
      {
        title: "Methods",
        subsections: [
          {
            subtitle: "Data Sources",
            content: `Air quality data came from the U.S. Environmental Protection Agency (EPA), including daily measurements of PM2.5 concentrations, ozone, and Air Quality Index at monitoring stations across Massachusetts. These records supported calculation of annual and monthly averages for counties or cities.

Heart disease mortality data was gathered from CDC datasets and Massachusetts state health reports, providing county-level age-adjusted rates for major cardiovascular diseases from 2018 to 2022, typically per 100,000 residents.`
          },
          {
            subtitle: "Data Processing",
            content: `Processing occurred in Python with pandas in Google Colab notebooks. Date columns converted to datetime format, records filtered to Massachusetts, missing values addressed, and daily PM2.5 aggregated into annual averages per county. Because monitoring stations usually do not align perfectly with county boundaries, county-level PM2.5 exposure was approximated using the average of the three nearest monitoring stations, a common approach in ecological analyses when finer-resolution exposure data are unavailable.`
          },
          {
            subtitle: "Interactive Visual Maps",
            content: `Line charts displayed yearly and monthly PM2.5 trends in areas like Worcester and Boston. Interactive maps using Plotly Express and Folium showed county-level mortality as colored markers or choropleths, with size and color scaling to rates and tooltips for details.`
          },
          {
            subtitle: "Statistical Analysis",
            content: `A merged dataset combined county-year rows with average PM2.5 and corresponding mortality rates. Analyses included:

Pearson correlation (formula: r = cov(X,Y) / (σ_X σ_Y)), which measures the strength and direction of linear relationships between two continuous variables.

Spearman rank correlation (formula: ρ = 1 - (6 Σ d_i²) / (n(n² - 1)), where d_i is the rank difference), a non-parametric measure assessing monotonic relationships and less sensitive to outliers or non-linearity.

Ordinary least squares (OLS) regression (minimizing Σ (y_i - (β_0 + β_1 x_i))²), estimating the linear relationship while controlling for confounding variables like year as a categorical factor.

Both Pearson and Spearman correlations were computed to assess sensitivity to linear versus monotonic relationships, given the possibility of non-linear exposure-response patterns in air pollution health effects. Model diagnostics examined residuals and overall fit.`
          }
        ]
      },
      {
        title: "Results",
        content: `Visualizations revealed modest PM2.5 variation across Massachusetts, with summer peaks in some years due to atmospheric conditions favoring secondary particle formation.

Pearson correlations remained weak (|r| < 0.25) across all years, with high p-values indicating no statistical significance. Spearman results aligned closely, showing no meaningful monotonic patterns.

The OLS regression, controlling for year, yielded low explanatory power (R² ≈ 0.009). The PM2.5 coefficient varied in direction and lacked consistent significance beyond noise. Residual plots displayed no systematic patterns, but the narrow PM2.5 range limited detection power. The 2020 COVID-19 surge dominated mortality fluctuations more than pollution differences.`
      },
      {
        title: "Discussion",
        content: `This ecological analysis found no evidence of a detectable association between annual county-level PM2.5 and heart disease mortality in Massachusetts from 2018 to 2022. The absence of statistically significant associations should be interpreted as a limitation of statistical power and exposure variability rather than evidence of no underlying effect. Several factors explain this null finding.

Massachusetts maintains relatively clean air nationally, resulting in limited year-to-year and county-to-county PM2.5 variation. This narrow exposure range reduces statistical power, making subtle effects hard to identify without larger samples or extended periods. Even true associations may remain undetectable here.

The exposure metric carries key limitations: Heart disease links typically involve long-term cumulative exposure over decades, not annual averages. County aggregation can misclassify individual exposures, as pollution and risks vary within counties. Many other factors—age distribution, smoking rates, income, healthcare access, and behaviors—strongly affect mortality but were unavailable for adjustment. The 2020 COVID-19 pandemic represents a major exogenous shock to cardiovascular mortality trends, likely overwhelming any modest pollution-related signal during this period.

These results do not contradict broader evidence from cohort studies and meta-analyses showing small but real cardiovascular risks from chronic PM2.5. Instead, they demonstrate challenges in ecological designs with public aggregated data over short horizons in low-variation settings.

The project built skills in data cleaning, visualization, mapping, and statistical evaluation. It reinforced that null results carry value when limitations are clearly acknowledged, promoting careful interpretation over overstated claims.`
      },
      {
        title: "Future Directions",
        content: `Future work could expand to national datasets, incorporate demographic adjustments if available, test multivariable models, or build an interactive dashboard integrating these visualizations.

Working with real data to explore environmental health questions has proven one of the most engaging parts of this high school research experience.`
      },
      {
        title: "References",
        content: ``,
        citations: [
          "U.S. Environmental Protection Agency. Outdoor Air Quality Data: Download Daily Data. Available at: https://www.epa.gov/outdoor-air-quality-data/download-daily-data.",
          "Centers for Disease Control and Prevention. Interactive Atlas of Heart Disease and Stroke. Available at: https://www.cdc.gov/dhdsp/maps/atlas/index.htm.",
          "Alexeeff SE, et al. Associations between long-term exposures to airborne PM2.5 components and mortality in Massachusetts: mixture analysis exploration. Environmental Health. 2022;21(1):97.",
          "Hart JE, et al. Particulate Matter Air Pollution and Cardiovascular Disease: An Update to the Scientific Statement From the American Heart Association. Circulation. 2010;121(21):2331-2378.",
          "Chen J, Hoek G. Long-term exposure to PM and all-cause and cause-specific mortality: A systematic review and meta-analysis. Environment International. 2020;143:105974."
        ]
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Paper Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">Research Paper</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{paperContent.title}</h2>
            <p className="text-green-100">
              {paperContent.authors} • {paperContent.date}
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <button 
              onClick={() => window.open('https://docs.google.com/document/d/1XdfQLBddZZEA-QTgRpeJmUbyj29oiW3UiG0KeaOPH40/edit?tab=t.0', '_blank')}
              className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              View Original
            </button>
          </div>
        </div>
      </div>

      {/* Abstract */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Abstract</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {paperContent.abstract}
        </p>
      </div>

      {/* Full Paper Content */}
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          {isExpanded ? 'Hide Full Paper' : 'Read Full Paper'}
        </button>

        {isExpanded && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {paperContent.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-xl mb-3 text-gray-900">
                  {section.title}
                </h3>
                {section.subsections ? (
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800">
                          {subsection.subtitle}
                        </h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : section.title === "References" && section.citations ? (
                  <div className="space-y-3">
                    {section.citations.map((citation, citIndex) => (
                      <div key={citIndex} className="flex items-start gap-2 group">
                        <p className="text-gray-700 leading-relaxed flex-1">
                          {citation}
                        </p>
                        <button
                          onClick={() => handleCopyCitation(citation, citIndex)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-md relative"
                          title="Copy citation"
                        >
                          {copiedIndex === citIndex ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                          {copiedIndex === citIndex && (
                            <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                              Copied!
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}