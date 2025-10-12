import Chart from "./Chart";
import LineChart from "./LineChart";

function Content(){
    return(
        <div className="p-3 bg-light">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light ">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-pin fs-1 text-success"></i>
                            <div>
                                <span>Reports submitted</span>
                                <h2>35</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light ">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-calendar-week fs-1 text-primary"></i>
                            <div>
                                <span>Classes</span>
                                <h2>26</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light ">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-graph-up-arrow fs-1 text-danger"></i>
                            <div>
                                <span>Average Attendance Rate</span>
                                <h2>90%</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light ">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-clock-history fs-1 text-warning"></i>
                            <div>
                                <span>Pending Reports</span>
                                <h2>1</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {/* the infographics */}
                <div className="row">
                    <div className="col-12 col-md-8 p-2">
                        <LineChart/>
                    </div>
                    <div className="col-12 col-md-4 p-3">
                        <Chart/>
                    </div>
                </div>

                <div className="row">

                    <div className="col-12 p-2">
                        <div className="bg-white p-3 border shadow-sm">
                            <h5>Notifications & Feedback</h5>
                            <div className="mt-2">
                                <div className="alert alert-info p-2">
                                    <small><strong>New Feedback:</strong> Principal Lecturer commented on your Web Design report</small>
                                </div>
                                <div className="alert alert-warning p-2">
                                    <small><strong>Reminder:</strong> BSCSM Y2S1 class report due tomorrow</small>
                                </div>
                                <div className="alert alert-success p-2">
                                    <small><strong>Approved:</strong> Your request was approved</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Content;