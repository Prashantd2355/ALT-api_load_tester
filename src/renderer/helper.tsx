import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Helper() {
  return (
    <>
      <h1 className="text-center text-uppercase mb-5">FAQ</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-body">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div className="circle-icon">
                {' '}
                <FontAwesomeIcon icon={faQuestion} size="lg" />
              </div>
              <span>
                <strong>What is ALT?</strong>
              </span>{' '}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div>
              {' '}
              <strong>ALT-API Load Tester.</strong> The ALT is the tool for API
              load testing. This tool is specially designed for software testers
              and software developers who can easily test the APIs. This tool
              provides the full report related to API performance which includes
              execution time of the API, records error occurred while executing
              these APIs, finally, the application helps to create stress
              testing environment.{' '}
            </div>
          </div>
        </div>
        <div className="accordion-body">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <div className="circle-icon">
                {' '}
                <FontAwesomeIcon icon={faQuestion} size="lg" />
              </div>
              <span>
                <strong>How can I use it?</strong>
              </span>{' '}
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div>
              <p>
                <strong>
                  There are some steps who makes this tool easy to use which are
                  as follows :{' '}
                </strong>
              </p>
              <p>1. Request for template file.</p>
              <p>
                2. Download the genearted template file and insert the necessory
                API details
              </p>
              <p>3. Upload the updated template file</p>
              <p>
                4. Now sit back wait for the execution finish and final result
              </p>
              <p>5. Analyse report visualy in table or graph format</p>
              <p>
                6. If want to export just select export option and report will
                be exported in PDF format
              </p>
              <p>This are some steps to use this tool.</p>
            </div>
          </div>
        </div>
        <div className="accordion-body">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <div className="circle-icon">
                {' '}
                <FontAwesomeIcon icon={faQuestion} size="lg" />
              </div>
              <span>
                <strong>How to download or upload template file?</strong>
              </span>{' '}
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div>
              For template file first you have to request for generate template
              file the tool itself generate the file and make available for you
              to download. You just need to select download option and it will
              download to your pc. After the updation of template file comeback
              to tool and select upload template option and select the updated
              file from file chooser dialog and its done.
            </div>
          </div>
        </div>
        <div className="accordion-body">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <div className="circle-icon">
                {' '}
                <FontAwesomeIcon icon={faQuestion} size="lg" />
              </div>
              <span>
                <strong>How can I see APIs results?</strong>
              </span>{' '}
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div>
              After follow all the steps of API load testing just need to stack
              back and wait for the execution complete, after execution complete
              the tool show the report of your API in table or graph format.
              There are total 4 types of graphs available which is Table, Bar,
              Pie, line.
            </div>
          </div>
        </div>
        <div className="accordion-body">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              <div className="circle-icon">
                {' '}
                <FontAwesomeIcon icon={faQuestion} size="lg" />
              </div>
              <span>
                <strong>How can I export the reports?</strong>
              </span>{' '}
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div>
              After the execution reports will show on screen and you can also
              download it in PDF format. For export you just need to select
              export option from our tool and tool itself generate the PDF file
              of all the reports and then you can download.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
