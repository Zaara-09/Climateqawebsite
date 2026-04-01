import { Mail, User, TrendingUp, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-6">
      {/* Project Background */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Project Background & Methodology</h2>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            This research project emerged from a broader goal of building an AI tool to highlight climate change
            impacts through disease patterns. The focus narrowed to Massachusetts and heart disease mortality,
            a leading cause of death nationally. Fine particulate matter (PM2.5) was selected as the key pollutant,
            given extensive prior research connecting long-term exposure to elevated cardiovascular risks.
          </p>

          <p>
            The study examined whether publicly available, county-level data in a state with generally good air
            quality could reveal detectable associations between PM2.5 exposure and heart disease mortality over
            the period 2018–2022. Unlike biomedical studies establishing causality through controlled cohorts,
            this ecological analysis tested the feasibility of detecting such links using aggregated public records.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Data Sources</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Air Quality Data:</strong> U.S. Environmental Protection Agency (EPA) - Daily PM2.5 measurements,
              ozone levels, and Air Quality Index from monitoring stations across Massachusetts</li>
              <li>• <strong>Mortality Data:</strong> CDC datasets and Massachusetts state health reports - County-level
              age-adjusted heart disease mortality rates (2018-2022)</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Statistical Methods</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Pearson Correlation:</strong> Measured linear relationships between PM2.5 and mortality</li>
              <li>• <strong>Spearman Rank Correlation:</strong> Assessed monotonic relationships, less sensitive to outliers</li>
              <li>• <strong>OLS Regression:</strong> Estimated linear relationships while controlling for year effects</li>
              <li>• <strong>Visualization:</strong> Interactive maps using Plotly Express and Folium showing county-level patterns</li>
            </ul>
          </div>

          <p>
            Processing was conducted in Python using pandas in Google Colab notebooks. County-level PM2.5 exposure
            was approximated using the average of the three nearest monitoring stations, a common approach in
            ecological analyses when finer-resolution exposure data are unavailable.
          </p>
        </div>
      </div>

      {/* Future Directions */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Future Directions</h2>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            While this study found no detectable short-term association in Massachusetts, several promising
            directions could enhance future research:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Expanded Scope</h3>
              <p className="text-sm">
                Expanding to national datasets would provide greater PM2.5 variation and increase statistical
                power to detect subtle health effects across diverse geographic and demographic contexts.
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Enhanced Controls</h3>
              <p className="text-sm">
                Incorporating demographic adjustments (age, income, healthcare access, smoking rates) if
                available would help control for confounding factors that strongly influence mortality.
              </p>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Modeling</h3>
              <p className="text-sm">
                Testing multivariable models with interaction terms and non-linear relationships could
                better capture complex exposure-response patterns in air pollution health effects.
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Tools</h3>
              <p className="text-sm">
                Building an interactive dashboard integrating visualizations, real-time data, and AI-powered
                insights could make environmental health research more accessible to the public.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 italic mt-4">
            Working with real data to explore environmental health questions has proven one of the most
            engaging parts of this high school research experience, reinforcing that null results carry
            value when limitations are clearly acknowledged.
          </p>
        </div>
      </div>

      {/* Author & Contact */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Author & Contact</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fatema Zaara Shaikh</h3>
              <p className="text-gray-700 mb-4">
                High school researcher passionate about environmental health, data science, and climate change.
                This project represents an exploration of real-world data analysis applied to public health questions.
              </p>

              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5 text-purple-600" />
                <a
                  href="mailto:shaikh.fatema.zaara@gmail.com"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  shaikh.fatema.zaara@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full">
              <h3 className="font-semibold text-gray-900 mb-3">Get in Touch</h3>
              <p className="text-gray-700 text-sm mb-4">
                Have questions about the research, methodology, or data? Interested in collaboration or
                want to provide feedback? Feel free to reach out!
              </p>

              <a
                href="mailto:shaikh.fatema.zaara@gmail.com?subject=Climate%20AI%20Research%20Inquiry"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Research Date:</strong> January 25, 2026 •
            <strong className="ml-2">Study Period:</strong> 2018-2022 •
            <strong className="ml-2">Location:</strong> Massachusetts, USA
          </p>
        </div>
      </div>
    </div>
  );
}
